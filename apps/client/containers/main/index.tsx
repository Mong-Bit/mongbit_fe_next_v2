'use client';

import { useRouter } from 'next/navigation';

import { CONST_MAIN_PAGE } from '@/constants/constant';
import { PATHS } from '@/constants/paths';
import * as B from '@/styles/base.style';

import { TitleAndMbtiTestBig, TitleAndMbtiTestsSmallForSeveral } from '@/components//MbtiTestContent';

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

export default function Main({ data }: Model.DataFromServer) {
  const router = useRouter();
  return (
    <B.Wrap_mediaquery flexDirection="column">
      <B.Title>
        <h3>{mainTitleText.titleText}</h3>
        <p>{mainTitleText.contentText}</p>
      </B.Title>

      <B.Button onClick={() => router.push(PATHS.RANDOM)} margin="1rem 0">
        {'아무거나 시작 >'}
      </B.Button>
      {/* 기본 심테 */}
      <TitleAndMbtiTestBig detail={mainMbtiTestDetail} />
      {/* 최신 심테 */}
      <TitleAndMbtiTestsSmallForSeveral mbtiTestData={data?.dataList} style={latestMbtiTestsDetail} />
    </B.Wrap_mediaquery>
  );
}
