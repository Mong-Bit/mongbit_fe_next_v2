import Image from 'next/image';
import { useState } from 'react';

import { IMAGE_ALT_STRING, KEY, LOGIN } from '@/constants/constant';
import { createHeaders, deleteCommentAPI, updateCommentAPI } from '@/services';
import * as B from '@/styles/base.style';
import { CommentDetailWrap, EachCommentWrap, EditInput } from '@/styles/CommentAreaUi';
import * as L from '@/styles/layout.style';
import theme from '@/styles/theme';
import { doSetStateWithNewState, formatTimeDifference } from '@/utils/common';
import { decodeToken } from '@/utils/login';

export default function CommentBody({ commentData, userInfo, setAction }: Base.CommentBodyProp) {
  const [isModifying, setIsModifying] = useState(Array(commentData.length).fill(false));
  const [newValue, setNewValue] = useState('');

  const role = decodeToken(userInfo[LOGIN.TOKEN_NAME])?.role;
  const memberId = userInfo[LOGIN.USER_MEMBER_ID];
  const isAdmin = role === LOGIN.ROLE_ADMIN;

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    commentData: Model.CommentData,
    index: number,
  ) => {
    if (event.key === KEY.ENTER && !event.nativeEvent.isComposing) handleClickCommentSubmit(commentData, index);
  };

  const handleChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => setNewValue(event.target.value);

  const handleClickCommentSubmit = async (commentData: Model.CommentData, index: number) => {
    if (newValue === '') return;

    const headers = createHeaders();

    const body = {
      id: commentData.id,
      memberId: commentData.memberId,
      testId: commentData.testId,
      commentDate: new Date(),
      content: newValue,
    };

    await updateCommentAPI(headers, body);

    setAction(`update ${new Date().toString()}`);
    doSetStateWithNewState(isModifying, setIsModifying, index, false);
  };

  const handleClickCommentUpdate = (index: number) => doSetStateWithNewState(isModifying, setIsModifying, index, true);

  const handleClickCommentDelete = async (commentData: Model.CommentData) => {
    const confirmResult = confirm('삭제하시겠습니까?');
    if (!confirmResult) return;

    const headers = createHeaders();
    const body = {
      id: commentData.id,
      memberId: commentData.memberId,
    };

    await deleteCommentAPI(headers, body);
    setAction(`delete ${new Date().toString()}`);
  };

  const handleClickCommentCancel = (index: number) => doSetStateWithNewState(isModifying, setIsModifying, index, false);

  return (
    <B.Wrap_mediaquery $flexDirection="column" $alignItems="baseline" gap="1rem">
      {commentData.map((el: Model.CommentData, i: number) => {
        const isEqualMemberId = memberId === el.memberId;
        const textEditOrSubmit = isModifying[i] ? '확인' : '수정';
        const textDeleteOrCancel = isModifying[i] ? '취소' : '삭제';

        return (
          <EachCommentWrap key={el.id} width="100%" $justifyContent="start">
            <B.ImageWrap width="2.5rem" height="2.5rem" $borderRadius="1rem">
              <Image
                src={el.thumbnailImage}
                alt={IMAGE_ALT_STRING.MONGBIT_TITLE + '코멘트 유저 이미지'}
                fill
                sizes="100%"
              />
            </B.ImageWrap>

            <CommentDetailWrap
              $isModifying={isModifying[i]}
              $borderBottom={newValue.length >= 100 ? '1px solid red' : `1px solid ${theme.colors.mediumGray}`}
            >
              <B.Text
                color={theme.colors.deepGray}
              >{`${el.username} · ${formatTimeDifference(el.commentDate)}`}</B.Text>

              {/* 원래 텍스트로 표시되다가, 수정 버튼 클릭 시 인풋 요소로 바뀜 */}
              {isModifying[i] ? (
                <div>
                  <EditInput
                    defaultValue={el.content}
                    type="text"
                    maxLength={100}
                    onChange={(event) => handleChangeInputValue(event)}
                    onKeyDown={(event) => handleKeyDown(event, el, i)}
                  />
                  <L.Position position="absolute" right="0">
                    <L.Flex>
                      <B.Text>{newValue.length}/</B.Text>
                      <B.Text>100</B.Text>
                    </L.Flex>
                  </L.Position>
                </div>
              ) : (
                <B.Text color={theme.colors.black} padding="0.2rem 4rem 0 0">
                  {el.content}
                </B.Text>
              )}
            </CommentDetailWrap>

            {/* 유저:  본인 댓글만 수정, 삭제 가능
                관리자: 본인 댓글만 수정 가능, 모든 댓글 삭제 가능 */}
            <L.Position position="absolute" right="0" top="0.2rem">
              <L.Flex gap="0.5rem">
                {isEqualMemberId && (
                  <B.Text
                    onClick={() => (isModifying[i] ? handleClickCommentSubmit(el, i) : handleClickCommentUpdate(i))}
                  >
                    {textEditOrSubmit}
                  </B.Text>
                )}
                <B.Text onClick={() => (isModifying[i] ? handleClickCommentCancel(i) : handleClickCommentDelete(el))}>
                  {isEqualMemberId ? textDeleteOrCancel : isAdmin ? textDeleteOrCancel : null}
                </B.Text>
              </L.Flex>
            </L.Position>
          </EachCommentWrap>
        );
      })}
    </B.Wrap_mediaquery>
  );
}
