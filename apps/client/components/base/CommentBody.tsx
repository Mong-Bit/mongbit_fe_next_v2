import { FONT, LOGIN } from '@/constants/constant';
import { formatTimeDifference } from '@/utils/common';
import { decodeToken } from '@/utils/logIn';

import { CommentBodyWrap, CommentDetailWrap, CommentText, EachCommentWrap } from '@/components/base/styledComponents';
import { Image } from '@/components/ui/CommonElements';

export default function CommentBody({
  commentData,
  value,
  userInfo,
}: {
  commentData: Model.CommentData[];
  value: string;
  userInfo: Model.LogInState;
}) {
  const role = decodeToken(userInfo[LOGIN.TOKEN_NAME])?.role;
  const memberId = userInfo[LOGIN.USER_MEMBER_ID];
  const isAdmin = role === LOGIN.ROLE_ADMIN;

  return (
    <CommentBodyWrap>
      {commentData.map((el: Model.CommentData) => (
        <EachCommentWrap key={el.id}>
          <Image src={el.thumbnailImage} width="2.5rem" height="2.5rem" borderRadius="1rem" />
          <CommentDetailWrap>
            <CommentText
              color={FONT.COLOR.DEEPGRAY}
            >{`${el.username} · ${formatTimeDifference(el.commentDate)}`}</CommentText>
            <CommentText padding="0.2rem 4rem 0 0">{el.content}</CommentText>
          </CommentDetailWrap>
          <div>
            {memberId === el.memberId && <p>수정</p>}
            {isAdmin ? <p>삭제</p> : memberId === el.memberId && <p>삭제</p>}
          </div>
        </EachCommentWrap>
      ))}
    </CommentBodyWrap>
  );
}
