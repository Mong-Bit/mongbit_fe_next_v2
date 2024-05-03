import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { FONT, IMAGE_ALT_STRING, KEY, LOGIN } from '@/constants/constant';
import { deleteComment, getAllCommentData, updateComment } from '@/services';
import { doSetActionWithNewValue, formatTimeDifference, getHeaders } from '@/utils/common';
import { decodeToken } from '@/utils/logIn';
import { sortCommentByDate, validationBeforeWriteComment } from '@/utils/mbtiTest';

import { CommentBodyWrap, CommentDetailWrap, CommentText, EachCommentWrap } from '@/components/base/styledComponents';
import { Image } from '@/components/ui/CommonElements';

export default function CommentBody({
  testId,
  commentData,
  userInfo,
  setComment,
}: {
  testId: string | null;
  commentData: Model.CommentData[];
  userInfo: Model.LogInState;
  setComment: React.Dispatch<React.SetStateAction<Model.CommentData[]>>;
}) {
  const [isModifying, setIsModifying] = useState(Array(commentData.length).fill(false));
  const [newValue, setNewValue] = useState('');
  const router = useRouter();
  const role = decodeToken(userInfo[LOGIN.TOKEN_NAME])?.role;
  const memberId = userInfo[LOGIN.USER_MEMBER_ID];
  const isAdmin = role === LOGIN.ROLE_ADMIN;

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    commentData: Model.CommentData,
    index: number,
  ) => {
    if (event.key === KEY.ENTER && !event.nativeEvent.isComposing) handleClickCommentSubmitButton(commentData, index);
  };

  const handleClickCommentSubmitButton = async (commentData: Model.CommentData, index: number) => {
    if (newValue === '') return;

    const valiateState = validationBeforeWriteComment(userInfo, router);
    if (!valiateState) return;

    const headers = getHeaders(true);
    const body = {
      id: commentData.id,
      memberId: commentData.memberId,
      testId: commentData.testId,
      commentDate: new Date(),
      content: newValue,
    };

    await updateComment(headers, body);
    await getAllCommentData(testId).then((response) => {
      doSetActionWithNewValue(null, setComment, null, sortCommentByDate(response?.dataList));
      doSetActionWithNewValue(isModifying, setIsModifying, index, false);
      setNewValue('');
    });
  };

  const handleChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => setNewValue(event.target.value);
  const handleClickCommentUpdateButton = (index: number) =>
    doSetActionWithNewValue(isModifying, setIsModifying, index, true);

  const handleClickCommentDeleteButton = async (commentData: Model.CommentData) => {
    const confirmResult = confirm('삭제하시겠습니까?');
    if (!confirmResult) return;

    const headers = getHeaders(true);
    const body = {
      id: commentData.id,
      memberId: commentData.memberId,
    };
    await deleteComment(headers, body);
    await getAllCommentData(testId).then((response) => {
      doSetActionWithNewValue(null, setComment, null, sortCommentByDate(response?.dataList));
    });
  };

  const handleClickCommentCancelButton = (index: number) =>
    doSetActionWithNewValue(isModifying, setIsModifying, index, false);

  return (
    <CommentBodyWrap>
      {commentData.map((el: Model.CommentData, i: number) => {
        const isEqualMemberId = memberId === el.memberId;

        const textEditOrSubmit = isModifying[i] ? '확인' : '수정';
        const textDeleteOrCancel = isModifying[i] ? '취소' : '삭제';

        return (
          <EachCommentWrap key={el.id}>
            <Image
              src={el.thumbnailImage}
              width="2.5rem"
              height="2.5rem"
              borderRadius="1rem"
              alt={IMAGE_ALT_STRING.MONGBIT_TITLE + '코멘트 유저 이미지'}
            />
            <CommentDetailWrap
              borderBottom={newValue.length >= 100 ? '1px solid red' : `1px solid ${FONT.COLOR.MEDIUMGRAY}`}
            >
              <CommentText
                color={FONT.COLOR.DEEPGRAY}
              >{`${el.username} · ${formatTimeDifference(el.commentDate)}`}</CommentText>

              {/* 원래 텍스트로 표시되다가, 수정 버튼 클릭 시 인풋 요소로 바뀜 */}
              {isModifying[i] ? (
                <div>
                  <input
                    defaultValue={el.content}
                    type="text"
                    maxLength={100}
                    onChange={(event) => handleChangeInputValue(event)}
                    onKeyDown={(event) => handleKeyDown(event, el, i)}
                  />
                  <div>
                    <p>{newValue.length}/</p>
                    <p>100</p>
                  </div>
                </div>
              ) : (
                <CommentText padding="0.2rem 4rem 0 0">{el.content}</CommentText>
              )}
            </CommentDetailWrap>

            {/* 유저:  본인 댓글만 수정, 삭제 가능
                관리자: 본인 댓글만 수정 가능, 모든 댓글 삭제 가능 */}
            <div>
              {isEqualMemberId && (
                <p
                  onClick={() =>
                    isModifying[i] ? handleClickCommentSubmitButton(el, i) : handleClickCommentUpdateButton(i)
                  }
                >
                  {textEditOrSubmit}
                </p>
              )}
              <p
                onClick={() =>
                  isModifying[i] ? handleClickCommentCancelButton(i) : handleClickCommentDeleteButton(el)
                }
              >
                {isEqualMemberId ? textDeleteOrCancel : isAdmin ? textDeleteOrCancel : null}
              </p>
            </div>
          </EachCommentWrap>
        );
      })}
    </CommentBodyWrap>
  );
}
