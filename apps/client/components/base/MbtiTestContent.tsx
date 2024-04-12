import { FONT, CONST_MAIN_PAGE } from '@/constants/constant';
import { MbtiTestcommentCountImage, MbtiTestLikeCountImage, MbtiTestPlayCountImage } from '@/public/images/mbtiTest';

import { Wrap_mediaquery } from '@/components/ui/Wrap';
import { MbtiTestVersionBig, MbtiTestVersionSmallForSeveral } from '@/components/ui/MbtiTest';
import { Image, Text, Wrap } from '@/components/ui/CommonElements';
import { TitleText } from '@/components/ui/CommonElements';

export function TitleAndText({ text }: Base.TitleAndTextProps) {
  return (
    <Wrap_mediaquery flexDirection="column" justifyContent="space-around" alignItems="baseline">
      <TitleText fontSize={FONT.SIZE.EXTRA_LARGE} fontWeight={FONT.BOLD_SCALE.BOLD}>
        {text.titleText}
      </TitleText>
      <TitleText fontSize={FONT.SIZE.MEDIUM} color={FONT.COLOR.DARKGRAY} margin="0.3rem 0 0 0">
        {text.contentText}
      </TitleText>
    </Wrap_mediaquery>
  );
}

export function TitleAndMbtiTestBig({ detail }: Base.TitleAndMbtiTestProps) {
  return (
    <Wrap_mediaquery
      flexDirection="column"
      justifyContent="space-around"
      alignItems="baseline"
      padding="1rem 1rem 0.8rem 0"
      position="relative"
    >
      <TitleText fontSize={FONT.SIZE.EXTRA_LARGE} fontWeight={FONT.BOLD_SCALE.BOLD}>
        {detail.titleText}
      </TitleText>
      <MbtiTestVersionBig imageUrl={detail.imageUrl} squareText={detail.squareText} />
    </Wrap_mediaquery>
  );
}

export function TitleAndMbtiTestsSmallForSeveral({ mbtiTestData }: Base.TitleAndMbtiTestsSmallForSeveralProp) {
  return (
    <Wrap_mediaquery
      flexDirection="column"
      justifyContent="space-around"
      alignItems="baseline"
      padding="1rem 1rem 0.8rem 0"
      position="relative"
    >
      <TitleText fontSize={FONT.SIZE.EXTRA_LARGE} fontWeight={FONT.BOLD_SCALE.BOLD}>
        {CONST_MAIN_PAGE.TITLE_TEXT.LATEST_MBTI_TEST}
      </TitleText>
      <MbtiTestVersionSmallForSeveral mbtiTestData={mbtiTestData.testCoverDTOList} />
    </Wrap_mediaquery>
  );
}

export function MbtiTestCountImageArea({ countData }: Base.MbtiTestCountImageAreaProp) {
  return (
    <Wrap position="relative" top="-2.5rem" display="flex">
      <Wrap display="flex" margin="0 0.7rem 0 0 ">
        <Image src={MbtiTestPlayCountImage.src} margin="-0.1rem 0.2rem 0 0" />
        <Text color={FONT.COLOR.DARKGRAY}>{countData?.playCount}</Text>
      </Wrap>
      <Wrap display="flex" margin="0 0.7rem 0 0 ">
        <Image src={MbtiTestLikeCountImage.src} margin="-0.2rem 0.2rem 0 0" />
        <Text color={FONT.COLOR.DARKGRAY}>{countData?.likeCount}</Text>
      </Wrap>
      <Wrap display="flex" margin="0 0.7rem 0 0 ">
        <Image src={MbtiTestcommentCountImage.src} margin="0 0.2rem 0 0" />
        <Text color={FONT.COLOR.DARKGRAY}>{countData?.commentCount}</Text>
      </Wrap>
    </Wrap>
  );
}