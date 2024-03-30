'use client';

import styled from 'styled-components';

import { CONST_FONT, CONST_MAIN_PAGE, MEDIAQUERY, TEST_IMAGE_URL } from '@/constants/constant';

import * as mainTypes from '../types/main';
import { TitleAndText, TitleAndTestBig, TitleAndTestsSmallForSeveral } from '@/components/base/TestContent';
import { YellowButton } from '@/components/ui/button/Button';
import { Wrap_mediaquery } from '@/components/ui/wrap/Wrap';

// import { getHeaders,} from '@/utils/util'
// import { apiBe } from '@/services';

// Element
const RandomStartYellowButton = styled(YellowButton)`
  margin: 1rem 0;
  border-radius: 1rem;
  width: ${MEDIAQUERY.WIDTH_370};
  height: 2.5rem;
  border-style: none;
  font-size: ${CONST_FONT.SIZE.FONT_SIZE_BIG_2};

  @media (max-width: ${MEDIAQUERY.WIDTH_375}) {
    width: ${MEDIAQUERY.WIDTH_345};
`;

// Detail
const mainTitleText = {
  titleText: CONST_MAIN_PAGE.MAIN_TITLE_TEXT.TITLE,
  contentText: CONST_MAIN_PAGE.MAIN_TITLE_TEXT.CONTENT,
};

const mainTestDetail = {
  titleText: CONST_MAIN_PAGE.TITLE_TEXT.MAIN_TEST,
  imageUrl: TEST_IMAGE_URL.MAIN_TEST,
  squareText: CONST_MAIN_PAGE.TITLE_TEXT.MAIN_TEST_SQUARE,
};

const latestTestsDetail = {
  titleText: CONST_MAIN_PAGE.TITLE_TEXT.LATEST_TEST,
};

export default function main({ data }: mainTypes.dataProp) {
  // Test 삭제
  // useEffect(()=>{
  //   const headers = getHeaders()
  //   apiBe.delete(`/api/v1/tests/test/649e4baa11bc25457a51f534`, {headers})
  //   .then((res)=>{
  //     console.log('r--> ', res)
  //   })
  // }, [])

  return (
    <Wrap_mediaquery flexDirection="column" justifyContent="center" alignItems="center">
      <TitleAndText text={mainTitleText} />
      <RandomStartYellowButton>{CONST_MAIN_PAGE.RANDOM_START_BUTTON_TEXT}</RandomStartYellowButton>

      {/* 기본 심테 */}
      <TitleAndTestBig detail={mainTestDetail} />

      {/* 최신 심테 */}
      <TitleAndTestsSmallForSeveral testData={data} style={latestTestsDetail} />
    </Wrap_mediaquery>
  );
}
