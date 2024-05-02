'use client';

import axios from 'axios';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { LOGIN } from '@/constants/constant';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { atomlogInState } from '@/recoil/atoms';
import { getHeaders } from '@/utils/common';
import { decodeToken } from '@/utils/logIn';

import { TitleAndText } from '@/components/base/MbtiTestContent';
import { MemberResultCard, MyPageUserInfoBox } from '@/components/ui/MyPage';
import { Wrap_mediaquery } from '@/components/ui/Wrap';


const headers = getHeaders();

type MemberTestResultDataProp = {
  hasNextPage: boolean;
  memberTestResultDTOList: Base.MemberTestResult[];
};

export default function ViewMyPage() {
  const [dataList, setDataList] = useState<Base.MemberTestResult[]>([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const user = useRecoilValue(atomlogInState);
  const logInState = decodeToken(user[LOGIN.TOKEN_NAME]);

  const getMemberTestResultAPI = async ({ page }: { page: number }) => {
    try {
      const respons = await axios.get<MemberTestResultDataProp>(
        `${process.env.NEXT_PUBLIC_BE_URL_PROD}/api/v1/member-test-result/${user![LOGIN.USER_MEMBER_ID]}`,
        { params: { page: page, size: 10 }, headers },
      );
      setHasNextPage(respons.data.hasNextPage);
      setDataList((prevData) => [...prevData, ...respons.data.memberTestResultDTOList]);
    } catch (error) {
      alert(`error: ${error}`);
    }
  };
  const { obsTarget, isLoading } = useInfiniteScroll(getMemberTestResultAPI);

  const title = {
    mypageTitle: { titleText: `🦁 ${user[LOGIN.USER_NAME]}님의 마이페이지` },
    resultTitle: { titleText: '🐭 최근 테스트 결과' },
  };

  return (
    <Wrap_mediaquery
      flexDirection="column"
      justifyContent="space-around"
      alignItems="center"
      padding="0 1.5rem 0 1.5rem"
    >
      <TitleAndText text={title.mypageTitle} />
      <MyPageUserInfoBox
        name={user[LOGIN.USER_NAME]}
        thumbnail={user[LOGIN.USER_THUMBNAIL]}
        registerDate={user[LOGIN.USER_REGISTER_DATE]}
        role={logInState?.role}
      />
      <TitleAndText text={title.resultTitle} />
      <div>
        <ul>
          {dataList.map((item) => (
            <li key={item.testId}>
              <MemberResultCard resultData={item} />
            </li>
          ))}
        </ul>
        {hasNextPage && <div ref={obsTarget} style={{ height: '10px' }} />}
        {isLoading && <p>Loading...</p>}
      </div>
    </Wrap_mediaquery>
  );
}
