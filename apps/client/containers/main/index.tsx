'use client';

import { CONST_MAIN_PAGE } from '@/constants/constant';
import * as mainTypes from '@/containers/types/main';
import { RandomStartYellowButton } from '@/containers/styledComponents';

import { TitleAndText, TitleAndTestBig, TitleAndTestsSmallForSeveral } from '@/components/base/TestContent';
import { Wrap_mediaquery } from '@/components/ui/wrap/Wrap';

// Detail
const mainTitleText = {
  titleText: '👀 랜덤 심리테스트',
  contentText: '고민할 틈은 안줄테니 일단 플레이하고 생각하기',
};

const mainTestDetail = {
  titleText: CONST_MAIN_PAGE.TITLE_TEXT.MAIN_TEST,
  imageUrl: 'https://i.ibb.co/GJ08BC3/quick-mbti-cover.png',
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
    <Wrap_mediaquery flexDirection="column" justifyContent="center" alignItems="center" padding="1rem 0 0 0">
      <TitleAndText text={mainTitleText} />
      <RandomStartYellowButton>{'아무거나 시작 >'}</RandomStartYellowButton>

      {/* 기본 심테 */}
      <TitleAndTestBig detail={mainTestDetail} />

      {/* 최신 심테 */}
      <TitleAndTestsSmallForSeveral testData={data} style={latestTestsDetail} />
    </Wrap_mediaquery>
  );
}
