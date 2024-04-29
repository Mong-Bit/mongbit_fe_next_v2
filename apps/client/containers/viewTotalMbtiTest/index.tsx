'use client';

import Link from 'next/link';
import { useState } from 'react';

import { VIEW_MBTI_TEST_PAGE } from '@/constants/constant';
import { doSeeMoreMbtiTests, getHeaders } from '@/utils/common';

import { TitleAndText } from '@/components/base/MbtiTestContent';
import { SeeMoreButton } from '@/components/ui/Button';
import { MbtiTestForViewPage } from '@/components/ui/MbtiTest';
import { Wrap_mediaquery } from '@/components/ui/Wrap';

const text = {
  titleText: VIEW_MBTI_TEST_PAGE.TOTAL.TITLE_TEXT,
  contentText: VIEW_MBTI_TEST_PAGE.TOTAL.CONTENT_TEXT,
};

export default function ViewTotalMbtiTest({ data }: Containers.ViewMbtiTestProp) {
  const [mbtiTestData, setMbtiTestData] = useState(data);
  const [page, setPage] = useState(1);

  const mbtiTestDataList = mbtiTestData?.dataList;
  const mbtiTestDataArray = mbtiTestDataList?.testCoverDTOList;
  const hasNextPage = mbtiTestDataList?.hasNextPage;

  const handleClickSeeMoreButton = () => {
    const headers = getHeaders();

    const fetchOption = {
      url: `/api/v1/tests/${page}/10`,
      method: 'GET',
      headers,
    };

    const seeMoreData = {
      fetchOption,
      data: {
        mbtiTestDataList,
        setMbtiTestData,
      },
      page: { page, setPage },
    };
    doSeeMoreMbtiTests(seeMoreData);
  };

  return (
    <Wrap_mediaquery flexDirection="column" justifyContent="center" alignItems="center" padding="1rem 0 0 0">
      <TitleAndText text={text} />
      {mbtiTestDataArray?.map((e) => (
        <Link key={e.id} href={`/mbti-test/preview/${e.id}`}>
          <MbtiTestForViewPage
            imageUrl={e.imageUrl}
            squareText={e.title}
            countData={{ playCount: e.playCount, likeCount: e.likeCount, commentCount: e.commentCount }}
          />
        </Link>
      ))}
      {hasNextPage && <SeeMoreButton onClick={handleClickSeeMoreButton} />}
    </Wrap_mediaquery>
  );
}
