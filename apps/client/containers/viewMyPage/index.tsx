'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { LOGIN } from '@/constants/constant';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { atomlogInState } from '@/recoil/atoms';
import { getHeaders } from '@/utils/common';
import { decodeToken } from '@/utils/logIn';

import { TitleAndText } from '@/components/base/MbtiTestContent';
import { FloatMenuButton, FloatTopButton } from '@/components/ui/FloatButton';
import {
  MemberResultCard,
  MemberResultCardListUl,
  MyPageMemberInfoBox,
  NonLogin,
  NotForMemberResultData,
  WrapForMemberResultCardLsit,
} from '@/components/ui/MyPage';
import { Wrap_mediaquery } from '@/components/ui/Wrap';


type MemberTestResultDataProp = {
  hasNextPage: boolean;
  memberTestResultDTOList: Base.MemberTestResult[];
};

const headers = getHeaders();

export default function ViewMyPage() {
  const [isClientLoading, setIsClientLoading] = useState(false);
  const [dataList, setDataList] = useState<Base.MemberTestResult[]>([]);
  const user = useRecoilValue(atomlogInState);
  const logInState = decodeToken(user[LOGIN.TOKEN_NAME]);

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
    if (user) {
      setContentTitle({
        mypageTitle: { titleText: `🦁 ${user[LOGIN.USER_NAME]}님의 마이페이지` },
        resultTitle: { titleText: '🐭 최근 테스트 결과' },
      });
      setIsClientLoading(true);
    }
  }, [user]);

  if (!user && !logInState?.state) return <NonLogin />;

  if (isClientLoading)
    return (
      <Wrap_mediaquery
        flexDirection="column"
        justifyContent="space-around"
        alignItems="center"
        padding="1rem 2rem 1rem 2rem"
      >
        <TitleAndText text={contentTitle.mypageTitle} />
        <MyPageMemberInfoBox
          name={user[LOGIN.USER_NAME]}
          thumbnail={user[LOGIN.USER_THUMBNAIL]}
          registerDate={user[LOGIN.USER_REGISTER_DATE]}
          role={logInState?.role}
        />
        <TitleAndText text={contentTitle.resultTitle} />
        {dataList ? (
          <WrapForMemberResultCardLsit>
            <MemberResultCardListUl>
              {dataList.map((item, index) => (
                <li key={index}>
                  <MemberResultCard resultData={item} />
                </li>
              ))}
            </MemberResultCardListUl>
            <div ref={obsTarget} style={{ height: '10px' }} />
            {isLoading && <p>Loading...</p>}
          </WrapForMemberResultCardLsit>
        ) : (
          <NotForMemberResultData />
        )}
        <FloatMenuButton bottom="85px" right="20px" />
        <FloatTopButton bottom="30px" right="20px" />
      </Wrap_mediaquery>
    );
}
