'use client';

import * as Types from '@/containers/types/viewLatestMbtiTest';
import { VIEW_MBTI_TEST_PAGE } from '@/constants/constant';

import { TitleAndText } from '@/components/base/MbtiTestContent';
import { Wrap_mediaquery } from '@/components/ui/wrap/Wrap';
import { MbtiTestForViewPage } from '@/components/ui/mbtiTest';
import { SeeMoreButton } from '@/components/ui/button/Button';

const text = {
  titleText: VIEW_MBTI_TEST_PAGE.TOTAL.TITLE_TEXT,
  contentText: VIEW_MBTI_TEST_PAGE.TOTAL.CONTENT_TEXT,
};

// const clickSeeMoreButton = () => {
//   return '';
// };

export default function ViewTotalMbtiTest({ data }: Types.dataProp) {
  const mbtiTestData = data.dataList.testCoverDTOList;

  return (
    <Wrap_mediaquery flexDirection="column" justifyContent="center" alignItems="center" padding="1rem 0 0 0">
      <TitleAndText text={text} />
      {mbtiTestData.map((e) => (
        <MbtiTestForViewPage
          key={e.id}
          imageUrl={e.imageUrl}
          squareText={e.title}
          countData={{ playCount: e.playCount, likeCount: e.likeCount, commentCount: e.commentCount }}
        />
      ))}
      <SeeMoreButton />
    </Wrap_mediaquery>
  );
}
