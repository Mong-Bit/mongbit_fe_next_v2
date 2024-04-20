import { FONT } from '@/constants/constant';
import { MbtiTestCommentImage } from '@/public/images/mbtiTest';

import { CommentHeaderText, CommentHeaderWrap, CommentTextBox } from './styledComponents';
import { Image } from '@/components/ui/CommonElements';
import { Wrap_mediaquery } from '@/components/ui/Wrap';

export default function MbtiTestCommentArea({ commentCount }: Base.MbtiTestCommentAreaProp) {
  return (
    <Wrap_mediaquery alignItems="center" flexDirection="column">
      <CommentHeaderWrap>
        <Image src={MbtiTestCommentImage.src} width="1rem" />
        <CommentHeaderText>댓글</CommentHeaderText>
        <CommentHeaderText color={FONT.COLOR.DEEPGRAY}>{commentCount}</CommentHeaderText>
      </CommentHeaderWrap>
      <CommentTextBox placeholder="나쁜말 하면 신고합니다 ㅇㅅㅇ" />
    </Wrap_mediaquery>
  );
}
