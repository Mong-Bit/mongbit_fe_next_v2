import { FONT, CONST_MAIN_PAGE } from '@/constants/constant';

import { Wrap_mediaquery } from '@/components/ui/wrap/Wrap';
import { TestVersionBig, TestVersionSmallForSeveral } from '@/components/ui/test/Test';
import { TitleText } from '@/components/ui/CommonElements';
import * as TypesTestContent from '@/components/ui/types/testContent';

export function TitleAndText({ text }: TypesTestContent.TitleAndTextProps) {
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

export function TitleAndTestBig({ detail }: TypesTestContent.TitleAndTestProps) {
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
      <TestVersionBig imageUrl={detail.imageUrl} squareText={detail.squareText} />
    </Wrap_mediaquery>
  );
}

export function TitleAndTestsSmallForSeveral({ testData }: TypesTestContent.TitleAndTestsSmallForSeveralProp) {
  return (
    <Wrap_mediaquery
      flexDirection="column"
      justifyContent="space-around"
      alignItems="baseline"
      padding="1rem 1rem 0.8rem 0"
      position="relative"
    >
      <TitleText fontSize={FONT.SIZE.EXTRA_LARGE} fontWeight={FONT.BOLD_SCALE.BOLD}>
        {CONST_MAIN_PAGE.TITLE_TEXT.LATEST_TEST}
      </TitleText>
      <TestVersionSmallForSeveral testData={testData.testCoverDTOList} />
    </Wrap_mediaquery>
  );
}