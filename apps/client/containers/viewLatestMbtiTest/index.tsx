'use client';

import Link from 'next/link';

import { VIEW_MBTI_TEST_PAGE } from '@/constants/constant';
import { PATHS, GENERATE_PATHS_TEST_ID } from '@/constants/paths';
import * as B from '@/styles/base.style';

import { MbtiTestForViewPage } from '@/components/MbtiTestContent';

const text = {
  titleText: VIEW_MBTI_TEST_PAGE.LATEST.TITLE_TEXT,
  contentText: VIEW_MBTI_TEST_PAGE.LATEST.CONTENT_TEXT,
};

export default function ViewLatestMbtiTest({ data }: Model.DataFromServer) {
  const mbtiTestData = data?.dataList.testCoverDTOList;

  return (
    <B.Wrap_mediaquery flexDirection="column">
      <B.Title margin="0 0 1rem 0">
        <h3>{text.titleText}</h3>
        <p>{text.contentText}</p>
      </B.Title>
      {mbtiTestData?.map((el) => (
        <Link href={GENERATE_PATHS_TEST_ID(el.id, PATHS.PREVIEW)} key={el.id}>
          <MbtiTestForViewPage
            imageUrl={el.imageUrl}
            squareText={el.title}
            countData={{ playCount: el.playCount, likeCount: el.likeCount, commentCount: el.commentCount }}
          />
        </Link>
      ))}
    </B.Wrap_mediaquery>
  );
}
