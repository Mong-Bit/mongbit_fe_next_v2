'use client';

import * as Types from '@/containers/types/viewLatestMbtiTest';
import { CONST_VIEW_LATEST_MBTI_TEST_PAGE } from '@/constants/constant';

import { TitleAndText } from '@/components/base/MbtiTestContent';
import { Wrap_mediaquery } from '@/components/ui/wrap/Wrap';
import { MbtiTestForViewPage } from '@/components/ui/mbtiTest';

const text = {
  titleText: CONST_VIEW_LATEST_MBTI_TEST_PAGE.TITLE_TEXT,
  contentText: CONST_VIEW_LATEST_MBTI_TEST_PAGE.CONTENT_TEXT,
};

export default function ViewLatestMbtiTest({ data }: Types.dataProp) {
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
    </Wrap_mediaquery>
  );
}
