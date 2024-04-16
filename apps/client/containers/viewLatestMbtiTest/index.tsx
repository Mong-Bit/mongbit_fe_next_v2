'use client';

import Link from 'next/link';

import { VIEW_MBTI_TEST_PAGE } from '@/constants/constant';

import { TitleAndText } from '@/components/base/MbtiTestContent';
import { MbtiTestForViewPage } from '@/components/ui/MbtiTest';
import { Wrap_mediaquery } from '@/components/ui/Wrap';
import * as Types from '@/containers/types/viewLatestMbtiTest';

const text = {
  titleText: VIEW_MBTI_TEST_PAGE.LATEST.TITLE_TEXT,
  contentText: VIEW_MBTI_TEST_PAGE.LATEST.CONTENT_TEXT,
};

export default function ViewLatestMbtiTest({ data }: Types.dataProp) {
  const mbtiTestData = data.dataList.testCoverDTOList;

  return (
    <Wrap_mediaquery flexDirection="column" justifyContent="center" alignItems="center" padding="1rem 0 0 0">
      <TitleAndText text={text} />
      {mbtiTestData.map((e) => (
        <Link key={e.id} href={`/mbtiTest/preview/${e.id}`}>
          <MbtiTestForViewPage
            imageUrl={e.imageUrl}
            squareText={e.title}
            countData={{ playCount: e.playCount, likeCount: e.likeCount, commentCount: e.commentCount }}
          />
        </Link>
      ))}
    </Wrap_mediaquery>
  );
}
