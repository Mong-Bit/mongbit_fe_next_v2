'use client';

import { useState } from 'react';

import { getHeaders } from '@/utils/util';
import * as Types from '@/containers/types/viewLatestMbtiTest';
import { VIEW_MBTI_TEST_PAGE } from '@/constants/constant';
import { fetchClient } from '@/services';

import { TitleAndText } from '@/components/base/MbtiTestContent';
import { Wrap_mediaquery } from '@/components/ui/Wrap';
import { MbtiTestForViewPage } from '@/components/ui/MbtiTest';
import { SeeMoreButton } from '@/components/ui/Button';

const text = {
  titleText: VIEW_MBTI_TEST_PAGE.TOTAL.TITLE_TEXT,
  contentText: VIEW_MBTI_TEST_PAGE.TOTAL.CONTENT_TEXT,
};

export default function ViewTotalMbtiTest({ data }: Types.dataProp) {
  const [mbtiTestData, setMbtiTestData] = useState(data);
  const [page, setPage] = useState(1);

  const mbtiTestDataList = mbtiTestData.dataList;
  const mbtiTestDataArray = mbtiTestDataList.testCoverDTOList;
  const hasNextPage = mbtiTestDataList.hasNextPage;

  const clickSeeMoreButton = () => {
    const headers = getHeaders();
    const fetchOption = {
      url: `/api/v1/tests/${page}/10`,
      method: 'GET',
      headers,
    };

    fetchClient(fetchOption).then((response) => {
      const oldMbtiTestData = mbtiTestDataList.testCoverDTOList;
      const newMbtiTestData = [...oldMbtiTestData, response.dataList.testCoverDTOList].flat();

      setMbtiTestData((prev) => ({
        ...prev,
        dataList: { hasNextPage: response.dataList.hasNextPage, testCoverDTOList: newMbtiTestData },
      }));
      setPage(page + 1);
    });
  };

  return (
    <Wrap_mediaquery flexDirection="column" justifyContent="center" alignItems="center" padding="1rem 0 0 0">
      <TitleAndText text={text} />
      {mbtiTestDataArray.map((e) => (
        <MbtiTestForViewPage
          key={e.id}
          imageUrl={e.imageUrl}
          squareText={e.title}
          countData={{ playCount: e.playCount, likeCount: e.likeCount, commentCount: e.commentCount }}
        />
      ))}
      {hasNextPage && <SeeMoreButton onClick={clickSeeMoreButton} />}
    </Wrap_mediaquery>
  );
}
