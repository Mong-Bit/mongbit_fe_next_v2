import { FONT } from '@/constants/constant';
import { MbtiTestCommentImage } from '@/public/images/mbtiTest';

import { CommentHeaderText, CommentHeaderWrap } from './styledComponents';
import { Image } from '@/components/ui/CommonElements';
import { Wrap_mediaquery } from '@/components/ui/Wrap';

export default function MbtiTestCommentArea({ commentCount }: Base.MbtiTestCommentAreaProp) {
  return (
    <Wrap_mediaquery justifyContent="center">
      <CommentHeaderWrap>
        <Image src={MbtiTestCommentImage.src} width="1rem" />
        <CommentHeaderText>댓글</CommentHeaderText>
        <CommentHeaderText color={FONT.COLOR.DEEPGRAY}>{commentCount}</CommentHeaderText>
      </CommentHeaderWrap>
    </Wrap_mediaquery>
  );
}
