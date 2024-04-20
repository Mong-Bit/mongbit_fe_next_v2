import { FONT } from '@/constants/constant';
import { MbtiTestCommentImage } from '@/public/images/mbtiTest';
import { formatTimeDifference } from '@/utils/common';

import {
  CommentBodyWrap,
  CommentDetailWrap,
  CommentHeaderText,
  CommentHeaderWrap,
  CommentText,
  CommentTextBox,
  EachCommentWrap,
} from './styledComponents';
import { Image } from '@/components/ui/CommonElements';
import { Wrap_mediaquery } from '@/components/ui/Wrap';

export default function MbtiTestCommentArea({ commentCount, mbtiTestCommentData }: Base.MbtiTestCommentAreaProp) {
  return (
    <Wrap_mediaquery alignItems="center" flexDirection="column">
      <CommentHeaderWrap>
        <Image src={MbtiTestCommentImage.src} width="1rem" />
        <CommentHeaderText>댓글</CommentHeaderText>
        <CommentHeaderText color={FONT.COLOR.DEEPGRAY}>{commentCount}</CommentHeaderText>
      </CommentHeaderWrap>

      <CommentTextBox placeholder="나쁜말 하면 신고합니다 ㅇㅅㅇ" />

      <CommentBodyWrap>
        {mbtiTestCommentData.map((e: Base.MbtiTestCommentData) => (
          <EachCommentWrap key={e.id}>
            <Image src={e.thumbnailImage} width="2.5rem" height="2.5rem" borderRadius="1rem" />
            <CommentDetailWrap>
              <CommentText
                color={FONT.COLOR.DEEPGRAY}
              >{`${e.username} · ${formatTimeDifference(e.commentDate)}`}</CommentText>
              <CommentText padding="0.2rem 0 0 0">{e.content}</CommentText>
            </CommentDetailWrap>
          </EachCommentWrap>
        ))}
      </CommentBodyWrap>
    </Wrap_mediaquery>
  );
}
