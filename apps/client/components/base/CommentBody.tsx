import { FONT } from '@/constants/constant';
import { formatTimeDifference } from '@/utils/common';

import { CommentBodyWrap, CommentDetailWrap, CommentText, EachCommentWrap } from '@/components/base/styledComponents';
import { Image } from '@/components/ui/CommonElements';

export default function CommentBody({ commentData }: { commentData: Model.CommentData }) {
  return (
    <CommentBodyWrap>
      {commentData.map((el: Base.MbtiTestCommentData) => (
        <EachCommentWrap key={el.id}>
          <Image src={el.thumbnailImage} width="2.5rem" height="2.5rem" borderRadius="1rem" />
          <CommentDetailWrap>
            <CommentText
              color={FONT.COLOR.DEEPGRAY}
            >{`${el.username} · ${formatTimeDifference(el.commentDate)}`}</CommentText>
            <CommentText padding="0.2rem 4rem 0 0">{el.content}</CommentText>
          </CommentDetailWrap>
        </EachCommentWrap>
      ))}
    </CommentBodyWrap>
  );
}
