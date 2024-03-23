import { CONST_FONT, CONST_MAIN_PAGE } from '@/constants/constant';

import { Wrap_mediaquery } from '@/components/ui/wrap/Wrap';
import { TestVersionBig, TestVersionSmallForSeveral } from '@/components/ui/test/Test';
import { TitleText } from '@/components/ui/CommonElements';
import * as Types from '@/components/ui/types';

export function TitleAndText({ text }: Types.TitleAndTextProps) {
  return (
    <Wrap_mediaquery
      flexDirection="column"
      justifyContent="space-around"
      alignitems="baseline"
      padding="1rem 1rem 0 0 "
    >
      <TitleText
        margin="0 0 0 1.5rem"
        fontSize={CONST_FONT.SIZE.FONT_SIZE_BIG}
        fontWeight={CONST_FONT.BOLD_SCALE.SECOND}
      >
        {text.titleText}
      </TitleText>
      <TitleText fontSize={CONST_FONT.SIZE.FONT_SIZE_REGULAR} color={CONST_FONT.COLOR.GRAY_1} margin="0.3rem 0 0 0">
        {text.contentText}
      </TitleText>
    </Wrap_mediaquery>
  );
}

export function TitleAndTest({ style }: Types.TitleAndTestProps) {
  return (
    <Wrap_mediaquery
      flexDirection="column"
      justifyContent="space-around"
      alignitems="baseline"
      padding="1rem 1rem 0.8rem 0"
      position="relative"
    >
      <TitleText
        margin="0 0 0 1.5rem"
        fontSize={CONST_FONT.SIZE.FONT_SIZE_BIG}
        fontWeight={CONST_FONT.BOLD_SCALE.SECOND}
      >
        {style.titleText}
      </TitleText>
      <TestVersionBig imageUrl={style.imageUrl} squareText={style.squareText} />
    </Wrap_mediaquery>
  );
}

export function TitleAndTestsSmallForSeveral({ testData }: Types.TitleAndTestsSmallForSeveralProp) {
  return (
    <Wrap_mediaquery
      flexDirection="column"
      justifyContent="space-around"
      alignitems="baseline"
      padding="1rem 1rem 0.8rem 0"
      position="relative"
    >
      <TitleText
        margin="0 0 0 1.5rem"
        fontSize={CONST_FONT.SIZE.FONT_SIZE_BIG}
        fontWeight={CONST_FONT.BOLD_SCALE.SECOND}
      >
        {CONST_MAIN_PAGE.TITLE_TEXT.LATEST_TEST}
      </TitleText>
      <TestVersionSmallForSeveral testData={testData.testCoverDTOList} />
    </Wrap_mediaquery>
  );
}
