import { useState } from 'react';

import { FONT, LOGIN } from '@/constants/constant';
import { updateComment } from '@/services';
import { formatTimeDifference, getHeaders } from '@/utils/common';
import { decodeToken } from '@/utils/logIn';

import { CommentBodyWrap, CommentDetailWrap, CommentText, EachCommentWrap } from '@/components/base/styledComponents';
import { Image } from '@/components/ui/CommonElements';

export default function CommentBody({
  commentData,
  userInfo,
}: {
  commentData: Model.CommentData[];
  userInfo: Model.LogInState;
}) {
  const [isModifying, setIsModifying] = useState(Array(commentData.length).fill(false));
  const role = decodeToken(userInfo[LOGIN.TOKEN_NAME])?.role;
  const memberId = userInfo[LOGIN.USER_MEMBER_ID];
  const isAdmin = role === LOGIN.ROLE_ADMIN;

  const handleClickCommentSubmitButton = (commentData: Model.CommentData) => {
    const headers = getHeaders(true);
    const body = {
      id: commentData.id,
      memberId: commentData.memberId,
      testId: commentData.testId,
      commentDate: new Date(),
      content: 'new value',
    };

    updateComment(headers, body);
  };

  const handleClickCommentUpdateButton = (index: number) => {
    const newArr = [...isModifying];
    newArr[index] = true;

    setIsModifying(newArr);
  };
  return (
    <CommentBodyWrap>
      {commentData.map((el: Model.CommentData, i: number) => (
        <EachCommentWrap key={el.id}>
          <Image src={el.thumbnailImage} width="2.5rem" height="2.5rem" borderRadius="1rem" />
          <CommentDetailWrap>
            <CommentText
              color={FONT.COLOR.DEEPGRAY}
            >{`${el.username} · ${formatTimeDifference(el.commentDate)}`}</CommentText>
            {isModifying[i] ? <input type="text" /> : <CommentText padding="0.2rem 4rem 0 0">{el.content}</CommentText>}
          </CommentDetailWrap>
          <div>
            {memberId === el.memberId && (
              <p
                onClick={() =>
                  isModifying[i] ? handleClickCommentSubmitButton(el) : handleClickCommentUpdateButton(i)
                }
              >
                {isModifying[i] ? '확인' : '수정'}
              </p>
            )}
            {!isModifying[i] ? isAdmin ? <p>삭제</p> : memberId === el.memberId && <p>삭제</p> : <p>취소</p>}
          </div>
        </EachCommentWrap>
      ))}
    </CommentBodyWrap>
  );
}
