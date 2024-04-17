'use client';

import { CONST_MAIN_PAGE } from '@/constants/constant';

import { TitleAndText, TitleAndMbtiTestBig, TitleAndMbtiTestsSmallForSeveral } from '@/components/base/MbtiTestContent';
import { Wrap_mediaquery } from '@/components/ui/Wrap';
import { RandomStartYellowButton } from '@/containers/styledComponents';

// Detail
const mainTitleText = {
  titleText: '👀 랜덤 심리테스트',
  contentText: '고민할 틈은 안줄테니 일단 플레이하고 생각하기',
};

const mainMbtiTestDetail = {
  titleText: CONST_MAIN_PAGE.TITLE_TEXT.MAIN_MBTI_TEST,
  imageUrl: 'https://i.ibb.co/GJ08BC3/quick-mbti-cover.png',
  squareText: CONST_MAIN_PAGE.TITLE_TEXT.MAIN_MBTI_TEST_SQUARE,
};

const latestMbtiTestsDetail = {
  titleText: CONST_MAIN_PAGE.TITLE_TEXT.LATEST_MBTI_TEST,
};

export default function Main({ data }: Containers.MainDataProp) {
  return (
    <Wrap_mediaquery flexDirection="column" justifyContent="center" alignItems="center" padding="1rem 0 0 0">
      <TitleAndText text={mainTitleText} />
      <RandomStartYellowButton>{'아무거나 시작 >'}</RandomStartYellowButton>

      {/* 기본 심테 */}
      <TitleAndMbtiTestBig detail={mainMbtiTestDetail} />

      {/* 최신 심테 */}
      <TitleAndMbtiTestsSmallForSeveral mbtiTestData={data.dataList} style={latestMbtiTestsDetail} />
    </Wrap_mediaquery>
  );
}
