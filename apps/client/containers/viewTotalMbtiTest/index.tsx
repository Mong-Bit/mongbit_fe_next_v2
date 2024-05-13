'use client';

import Link from 'next/link';
import { useState } from 'react';

import { VIEW_MBTI_TEST_PAGE } from '@/constants/constant';
import { PATHS, GENERATE_PATHS_TEST_ID } from '@/constants/paths';
import * as B from '@/styles/base.style';
import { SeeMoreButton } from '@/styles/Common';
import theme from '@/styles/theme';
import { getHeaders } from '@/utils/common';
import { doSeeMoreMbtiTests } from '@/utils/mbtiTest';

import { MbtiTestForViewPage } from '@/components/MbtiTestContent';

const text = {
  titleText: VIEW_MBTI_TEST_PAGE.TOTAL.TITLE_TEXT,
  contentText: VIEW_MBTI_TEST_PAGE.TOTAL.CONTENT_TEXT,
};

export default function ViewTotalMbtiTest({ data }: Model.DataFromServer) {
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
    <B.Wrap_mediaquery $flexDirection="column">
      <B.Title margin="0 0 1rem 0">
        <h3>{text.titleText}</h3>
        <p>{text.contentText}</p>
      </B.Title>

      {mbtiTestDataArray?.map((el) => (
        <Link key={el.id} href={GENERATE_PATHS_TEST_ID(el.id, PATHS.PREVIEW)}>
          <MbtiTestForViewPage
            imageUrl={el.imageUrl}
            squareText={el.title}
            countData={{ playCount: el.playCount, likeCount: el.likeCount, commentCount: el.commentCount }}
          />
        </Link>
      ))}
      {hasNextPage && (
        <SeeMoreButton onClick={handleClickSeeMoreButton} $backgroundColor={theme.colors.lightGray}>
          더 보기
        </SeeMoreButton>
      )}
    </B.Wrap_mediaquery>
  );
}
