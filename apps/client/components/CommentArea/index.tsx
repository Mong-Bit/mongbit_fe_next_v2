import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';

import { IMAGE_ALT_STRING, KEY, LOGIN } from '@/constants/constant';
import { CommentSubmitImage } from '@/public/images/mbtiTest';
import { CommentImage } from '@/public/images/mbtiTest';
import { atomlogInState } from '@/recoil/atoms';
import { getMbtiTestCommentData, submitComment } from '@/services';
import * as B from '@/styles/base.style';
import { CommentInput } from '@/styles/CommentAreaUi';
import { SeeMoreButton } from '@/styles/Common';
import * as L from '@/styles/layout.style';
import theme from '@/styles/theme';
import { doSetStateWithNewState, getHeaders } from '@/utils/common';
import { sortCommentByDate, validationBeforeWriteComment } from '@/utils/mbtiTest';

import CommentBody from '@/components//CommentBody';

const SubmitButton = styled(B.Button)`
  background-image: url(${CommentSubmitImage.src});
  background-size: cover;
  width: 1.5rem;
  height: 1.5rem;

  position: absolute;
  right: 0.5rem;
  top: 0.8rem;
`;
export default function MbtiTestCommentArea({
  testId,
  commentCount,
  commentPageSet,
  mbtiTestCommentData,
  hasNextPageComment,
  setAction,
}: Base.MbtiTestCommentAreaProp) {
  const router = useRouter();
  const [value, setValue] = useState('');
  const [comment, setComment] = useState(sortCommentByDate(mbtiTestCommentData));
  const [hasNextPage, setHasNextPage] = useState(hasNextPageComment);
  const [userInfo, setUserInfo] = useRecoilState(atomlogInState);

  useEffect(() => {
    setComment(sortCommentByDate(mbtiTestCommentData));
  }, [mbtiTestCommentData]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === KEY.ENTER && !event.nativeEvent.isComposing) handleClickCommentSubmit();
  };
  const handleChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value);
  const handleClickCommentSubmit = async () => {
    if (value === '') return;

    const valiateState = validationBeforeWriteComment(userInfo, router);
    if (!valiateState) return;

    const headers = getHeaders(true);
    const body = {
      memberId: userInfo[LOGIN.USER_MEMBER_ID],
      testId: testId,
      content: value,
    };

    await submitComment(headers, body);
    setAction(`add ${new Date().toString()}`);

    setUserInfo((prev: Model.LogInState) => ({ ...prev, [LOGIN.LAST_COMMENT_TIME]: new Date() }));
    setValue('');
  };

  const handleClickSeeMoreComment = () => {
    getMbtiTestCommentData(testId, commentPageSet.commentPage).then((response) => {
      const newArr = [...comment, response?.dataList.commentDTOList].flat();

      doSetStateWithNewState(null, setComment, null, newArr);
      setHasNextPage(response?.dataList.hasNextPage);
    });

    commentPageSet.setCommentPage(commentPageSet.commentPage + 1);
  };

  return (
    <B.Wrap_mediaquery flexDirection="column">
      <L.Flex margin="0 0 0.5rem 0" width="100%" justifyContent="space-between">
        <L.Flex gap="0.2rem">
          <B.ImageWrap width="1rem" height="1rem">
            <Image src={CommentImage.src} alt={IMAGE_ALT_STRING + '코멘트 아이콘'} fill sizes="100%" />
          </B.ImageWrap>
          <B.Text>댓글</B.Text>
          <B.Text color={theme.colors.deepGray}>{commentCount}</B.Text>
        </L.Flex>
        <L.Flex>
          <B.Text>{value.length}/</B.Text>
          <B.Text>100</B.Text>
        </L.Flex>
      </L.Flex>

      <L.Position position="relative">
        <CommentInput
          placeholder="나쁜말 하면 신고합니다 ㅇㅅㅇ"
          onKeyDown={handleKeyDown}
          onChange={(event) => handleChangeInputValue(event)}
          value={value}
          maxLength={100}
          borderBottom={value.length >= 100 ? '2px solid red' : ''}
        />
        <SubmitButton onClick={handleClickCommentSubmit} />
      </L.Position>

      <CommentBody testId={testId} commentData={comment} userInfo={userInfo} setAction={setAction} />

      {hasNextPage && (
        <SeeMoreButton
          margin="1.5rem 0 0 0"
          backgroundColor={theme.colors.lightGray}
          onClick={handleClickSeeMoreComment}
        >
          더 보기
        </SeeMoreButton>
      )}
    </B.Wrap_mediaquery>
  );
}
