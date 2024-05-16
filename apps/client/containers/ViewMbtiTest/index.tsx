'use client';

import Link from 'next/link';
import { useState } from 'react';

import { VIEW_MBTI_TEST_PAGE } from '@/constants/constant';
import { PATHS, getTestIdPath } from '@/constants/paths';
import * as B from '@/styles/base.style';
import { SeeMoreButton } from '@/styles/Common';
import theme from '@/styles/theme';
import { getHeaders } from '@/utils/common';
import { doSeeMoreMbtiTests } from '@/utils/mbtiTest';

import { MbtiTestItem } from '@/components/MbtiTestItem';

export default function ViewMbtiTest({ data, isViewTotal }: Model.DataFromServer) {
  const [mbtiTestData, setMbtiTestData] = useState(data);
  const [page, setPage] = useState(1);
  const hasNextPage = mbtiTestData?.hasNextPage;

  const handleClickSeeMore = () => {
    const headers = getHeaders();

    const fetchOption = {
      url: `/api/v1/tests/${page}/10`,
      method: 'GET',
      headers,
    };

    const seeMoreData = {
      fetchOption,
      data: {
        mbtiTestData,
        setMbtiTestData,
      },
      page: { page, setPage },
    };

    doSeeMoreMbtiTests(seeMoreData);
  };

  const text = {
    titleText: isViewTotal ? VIEW_MBTI_TEST_PAGE.TOTAL.TITLE_TEXT : VIEW_MBTI_TEST_PAGE.LATEST.TITLE_TEXT,
    contentText: isViewTotal ? VIEW_MBTI_TEST_PAGE.TOTAL.CONTENT_TEXT : VIEW_MBTI_TEST_PAGE.LATEST.CONTENT_TEXT,
  };

  return (
    <B.Wrap_mediaquery $flexDirection="column">
      <B.Title margin="0 0 1rem 0">
        <h3>{text.titleText}</h3>
        <p>{text.contentText}</p>
      </B.Title>
      {mbtiTestData?.testCoverDTOList.map((el) => (
        <Link href={`/mbti-test/preview/${el.id}`} key={el.id}>
          <MbtiTestItem
            imageUrl={el.imageUrl}
            squareText={el.title}
            countData={{ playCount: el.playCount, likeCount: el.likeCount, commentCount: el.commentCount }}
          />
        </Link>
      ))}

      {isViewTotal && hasNextPage && (
        <SeeMoreButton onClick={handleClickSeeMore} $backgroundColor={theme.colors.lightGray}>
          더 보기
        </SeeMoreButton>
      )}
    </B.Wrap_mediaquery>
  );
}
