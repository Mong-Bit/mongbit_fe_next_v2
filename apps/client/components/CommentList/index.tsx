import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { CommentImage, CommentSubmitImage } from '@/public/images/mbtiTest';
import { atomloginState } from '@/recoil/atoms';
import {
  createHeaders,
  deleteCommentAPI,
  getCommentAPI,
  getCommentCountAPI,
  submitCommentAPI,
  updateCommentAPI,
} from '@/services';
import * as B from '@/styles/base.style';
import * as L from '@/styles/layout.style';
import theme from '@/styles/theme';
import { CommentData } from '@/types';
import { decodeToken } from '@/utils/login';

import CommentItem from './CommentItem';
import IconButton from '../Buttons/IconButton';

import { COMMENT_MAX_LENGTH, IMAGE_ALT_STRING, LOGIN } from '@/constants';

interface Props {
  testId: string;
}

const Input = styled.input`
  width: 100%;
  height: 2rem;
  padding: 0 0.3rem;
  background-color: transparent;
  font-size: ${(props) => props.theme.font.size.s};
  color: ${(props) => props.theme.colors.deepGray};
  border-style: none;

  &::placeholder {
    font-size: ${(props) => props.theme.font.size.s};
    color: ${(props) => props.theme.colors.deepGray};
  }

  &:focus {
    outline: none;
  }
`;

const InputWrap = styled(L.Flex)<{ $isMaxLength?: boolean }>`
  width: 100%;
  height: 2.5rem;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.lightGray};
  padding: 8px;
  border-radius: 0.4rem;

  border-bottom: 2px solid ${(props) => (props.$isMaxLength ? 'red' : props.theme.colors.lightGray)};
`;

const CommentList = ({ testId }: Props) => {
  const [value, setValue] = useState('');
  const [page, setPage] = useState(0);
  const [commentData, setCommentData] = useState<CommentData[]>([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [commentCount, setCommentCount] = useState(0);

  const router = useRouter();
  const userInfo = useRecoilValue(atomloginState);
  const role = decodeToken(userInfo[LOGIN.TOKEN_NAME])?.role;
  const loginUserId = userInfo[LOGIN.USER_MEMBER_ID];

  const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.nativeEvent.isComposing) onClickSubmitButton();
  };

  const getCommentCount = useCallback(async () => {
    const res = await getCommentCountAPI(testId!);
    if (res) {
      setCommentCount(res);
    }
  }, [testId]);

  const getComments = useCallback(async () => {
    const res = await getCommentAPI(testId!, page);
    if (res) {
      setCommentData((prev) => [...prev, ...res.commentDTOList]);
      setHasNextPage(res.hasNextPage);
      setPage((prev) => prev + 1);
    }
  }, [testId, page]);

  const fetchComments = useCallback(async () => {
    const pages = Array.from({ length: page }, (_, i) => i);
    const responses = await Promise.all(pages.map((p) => getCommentAPI(testId!, p)));

    if (responses) {
      setCommentData([]);

      responses.forEach((res) => {
        setCommentData((prev) => [...prev, ...res!.commentDTOList]);
        setHasNextPage(res!.hasNextPage);
      });

      getCommentCount();
    }
  }, [testId, page, getCommentCount]);

  const onClickSubmitButton = async () => {
    if (value === '') return;
    const headers = createHeaders();
    const body = {
      memberId: userInfo[LOGIN.USER_MEMBER_ID],
      testId: testId,
      content: value,
    };

    await submitCommentAPI(headers!, body);

    setValue('');
    fetchComments();
  };

  const handleUpdateComment = async (comment: CommentData, content: string) => {
    const headers = createHeaders();

    const body = {
      id: comment.id,
      memberId: comment.memberId,
      testId: comment.testId,
      commentDate: new Date(),
      content: content,
    };

    await updateCommentAPI(headers!, body);
    fetchComments();
  };

  const onClickDeleteButton = async (id: string, memberId: string) => {
    const confirmResult = confirm('삭제하시겠습니까?');

    if (!confirmResult) return;

    const headers = createHeaders();
    const body = {
      id: id,
      memberId: memberId,
    };

    await deleteCommentAPI(headers!, body);
    fetchComments();
  };

  useEffect(() => {
    getComments();
    getCommentCount();
  }, []);

  return (
    <>
      <L.Flex $flexDirection="column" width="100%">
        <L.Flex margin="0 0 0.5rem 0" width="100%" $justifyContent="space-between">
          <L.Flex gap="0.3rem">
            <B.ImageWrap width="1rem" height="1rem">
              <Image src={CommentImage} alt={IMAGE_ALT_STRING + '코멘트 아이콘'} fill sizes="100%" />
            </B.ImageWrap>
            <B.Text>댓글 {commentCount}</B.Text>
          </L.Flex>
          <B.Text>
            {value.length} / {COMMENT_MAX_LENGTH}
          </B.Text>
        </L.Flex>
        {loginUserId ? (
          <InputWrap $isMaxLength={value.length >= COMMENT_MAX_LENGTH}>
            <Input
              placeholder="나쁜말 하면 신고합니다 ㅇㅅㅇ"
              value={value}
              type="text"
              maxLength={COMMENT_MAX_LENGTH}
              onKeyDown={onKeyDown}
              onChange={onChangeValue}
            />
            <IconButton
              width="1.6rem"
              height="1.6rem"
              src={CommentSubmitImage}
              isOn={true}
              onClick={onClickSubmitButton}
            />
          </InputWrap>
        ) : (
          <B.Button onClick={() => router.push('/login')} $colorType="gray">
            CLICK! 로그인 하고 댓글 달기!
          </B.Button>
        )}
      </L.Flex>

      <L.Flex $flexDirection="column" margin="20px 0">
        {commentData.length === 0 ? (
          <B.Text $lineHeight="70px" fontSize="17px">
            첫 댓글을 남겨주세요! 🥳
          </B.Text>
        ) : (
          commentData.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              role={role}
              loginUserId={loginUserId}
              handleUpdateComment={handleUpdateComment}
              onClickDeleteButton={onClickDeleteButton}
            />
          ))
        )}

        {hasNextPage && (
          <B.Button
            onClick={() => getComments()}
            $colorType="gray"
            $borderRadius="1rem"
            width="7rem"
            height="2rem"
            fontSize={theme.font.size.s}
            margin="20px 0"
          >
            더 보기
          </B.Button>
        )}
      </L.Flex>
    </>
  );
};
export default CommentList;
