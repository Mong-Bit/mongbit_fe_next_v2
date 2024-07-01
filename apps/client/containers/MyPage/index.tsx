'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { LOGIN } from '@/constants/constant';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { atomloginState } from '@/recoil/atoms';
import { createHeaders } from '@/services';
import * as B from '@/styles/base.style';
import { getHeaders } from '@/utils/common';
import { decodeToken } from '@/utils/login';

import MemberInfoCard from './MemberInfoCard';
import NonMyPage from './NonMypage';
import TestResultItem from './TestResultItem';
import { FloatMenuButton, FloatTopButton } from '@/components/common/buttons/FloatButton';

type MemberTestResultDataProp = {
  hasNextPage: boolean;
  memberTestResultDTOList: Model.MyPageMbtiResult[];
};

const headers = createHeaders();

export default function MyPage() {
  const [isClientLoading, setIsClientLoading] = useState(false);
  const [dataList, setDataList] = useState<Model.MyPageMbtiResult[]>([]);
  const user = useRecoilValue(atomloginState);
  const loginState = decodeToken(user[LOGIN.TOKEN_NAME]);

  const [contentTitle, setContentTitle] = useState({
    mypageTitle: { titleText: '' },
    resultTitle: { titleText: '' },
  });

  const getMemberTestResultAPI = async ({ page }: { page: number }) => {
    try {
      if (user) {
        const respons = await axios.get<MemberTestResultDataProp>(
          `${process.env.NEXT_PUBLIC_BE_URL_PROD}/api/v1/member-test-result/${user![LOGIN.USER_MEMBER_ID]}`,
          { params: { page: page, size: 10 }, headers },
        );
        setDataList((prevData) => [...prevData, ...respons.data.memberTestResultDTOList]);
      }
    } catch (error) {
      alert(`error: ${error}`);
    }
  };

  const { obsTarget, isLoading } = useInfiniteScroll(getMemberTestResultAPI);

  useEffect(() => {
    if (user[LOGIN.USER_NAME]) {
      setContentTitle({
        mypageTitle: { titleText: `🦁 ${user[LOGIN.USER_NAME]}님의 마이페이지` },
        resultTitle: { titleText: '🐭 최근 테스트 결과' },
      });
    }
    setIsClientLoading(true);
  }, [user]);

  if (isClientLoading && !user[LOGIN.USER_MEMBER_ID]) return <NonMyPage pageType="NonLogin" />;

  if (isClientLoading)
    return (
      <B.Wrap_mediaquery $flexDirection="column" gap="10px">
        <B.Title>
          <h3>{contentTitle.mypageTitle.titleText}</h3>
        </B.Title>
        <MemberInfoCard
          username={user[LOGIN.USER_NAME]}
          thumbnail={user[LOGIN.USER_THUMBNAIL]}
          registDate={user[LOGIN.USER_REGISTER_DATE]}
          role={loginState?.role}
        />
        {dataList ? (
          <>
            <B.Title>
              <h3>{contentTitle.resultTitle.titleText}</h3>
            </B.Title>
            <div style={{ width: '100%' }}>
              <B.ListUl>
                {dataList.map((item, index) => (
                  <li key={index}>
                    <TestResultItem resultData={item} />
                  </li>
                ))}
              </B.ListUl>
              <div ref={obsTarget} style={{ height: '10px' }} />
              {isLoading && <p>Loading...</p>}
            </div>
          </>
        ) : (
          <NonMyPage pageType="NoResultData" />
        )}
        <FloatMenuButton bottom="85px" right="calc(50% - 180px)" />
        <FloatTopButton bottom="30px" right="calc(50% - 180px)" />
      </B.Wrap_mediaquery>
    );
}
