import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

import { LOGIN } from '@/constants/constant';
import { PATHS } from '@/constants/paths';
import * as B from '@/styles/base.style';
import * as L from '@/styles/layout.style';
import theme from '@/styles/theme';

// MyPageUserInfoBox
const UserInfoBox = styled(L.Flex)`
  width: 100%;
  height: 70px;
  background-color: ${(props) => props.theme.colors.bgColor};
  font-size: ${(props) => props.theme.font.size.m};
  border: 1px solid ${theme.colors.lightGray};
  border-radius: 1rem;
  margin: 10px 0 20px 0;
  padding: 10px 15px;

  span {
    color: ${(props) => props.theme.colors.deepGray};
    font-size: ${(props) => props.theme.font.size.s};
  }
`;

const MemberTag = styled.div`
  color: ${(props) => props.theme.colors.white};
  font-size: 9px;
  background-color: #d04545;
  border-radius: 1rem;
  padding: 5px 8px;
`;

//MemberResultCard
const TestResultItemBox = styled(L.Flex)`
  height: 185px;
  border-radius: 1rem;
  border: 1px solid ${theme.colors.lightGray};
  overflow: hidden;

  & > div:nth-child(2) {
    width: 65%;
    height: 100%;
    padding: 10px;
  }
`;

const TestResultItemTitle = styled(B.TextEllipsis)`
  color: ${theme.colors.black};
  height: 30px;
  line-height: 30px;
  margin-bottom: 10px;
  font-size: ${(props) => props.theme.font.size.l};
  border-bottom: 0.9px solid ${theme.colors.lightGray};
`;

export const MyPageMemberInfoCard = ({ name, thumbnail, registerDate, role }: Ui.MyPageInfoDivProp) => (
  <UserInfoBox justifyContent="space-between">
    <B.ImageWrap width="2.5rem" height="2.5rem" borderRadius="1rem">
      <Image src={thumbnail} alt={`${name}님 프로필 이미지`} fill sizes="100%" />
    </B.ImageWrap>

    <L.Flex width="82%" height="100%" flexDirection="column" alignItems="space-between" justifyContent="space-around">
      <L.Flex justifyContent="space-between">
        <p>{name}</p>
        {role && <MemberTag>{role === LOGIN.ROLE_ADMIN && 'Admin'}</MemberTag>}
      </L.Flex>
      <span>{registerDate?.split('T')[0]}</span>
    </L.Flex>
  </UserInfoBox>
);

export const TestResultItem = ({ resultData }: { resultData: Base.MemberTestResult }) => {
  const contentTextArray = resultData.content.split('<br>');

  return (
    <TestResultItemBox>
      <B.ImageWrap width="35%" height="100%">
        <Image
          src={resultData.imageUrl}
          alt={`${resultData.title} 이미지`}
          fill
          sizes="100%"
          priority
          style={{
            objectFit: 'cover',
          }}
        />
      </B.ImageWrap>
      <div>
        <TestResultItemTitle>{resultData.title}</TestResultItemTitle>
        {contentTextArray.slice(0, 6).map((text, index) => (
          <B.TextEllipsis margin="0 0 5px 0" key={index}>
            • {text}
          </B.TextEllipsis>
        ))}
      </div>
    </TestResultItemBox>
  );
};

export const NonLogin = () => {
  const router = useRouter();

  return (
    <B.Wrap_mediaquery height="600px" flexDirection="column" justifyContent="space-evenly">
      <B.Title textalign="center">
        <h3>로그인이 되어 있지 않아요 🥲</h3>
        <p>로그인 하고 나의 결과 기록 확인하기</p>
      </B.Title>
      <B.Button onClick={() => router.push(PATHS.LOGIN)}>로그인 하러 가기</B.Button>
    </B.Wrap_mediaquery>
  );
};

export const NoResultData = () => {
  const router = useRouter();

  return (
    <B.Wrap_mediaquery height="350px" flexDirection="column" justifyContent="space-around">
      <B.Title textalign="center">
        <h3>테스트 결과가 없어요! 🥹</h3>
        <p>테스트 즐기고 결과 확인하기 👾</p>
      </B.Title>
      <L.Flex height="200px" flexDirection="column" justifyContent="space-between">
        <B.Button width="150px" onClick={() => router.push(PATHS.TOTAL)}>
          전체 목록
        </B.Button>
        <B.Button width="150px" onClick={() => router.push(PATHS.LATEST)}>
          최신 목록
        </B.Button>
        <B.Button width="150px" onClick={() => router.push(PATHS.RANDOM)}>
          랜덤 테스트
        </B.Button>
      </L.Flex>
    </B.Wrap_mediaquery>
  );
};
