import { useRouter } from 'next/navigation';
import styled from 'styled-components';

import { FONT, LOGIN, MEDIAQUERY } from '@/constants/constant';

import { YellowButton } from '../Button';
import { Wrap_mediaquery } from '../Wrap';
import { TitleAndText } from '@/components/base/MbtiTestContent';
import { Image } from '@/components/ui/CommonElements';
import { MbtiTestStartButton, RandomStartYellowButton } from '@/containers/styledComponents';

// MyPageUserInfoBox
const WrapForUserInfoDiv = styled.div`
  background-color: white;
  width: 100%;
  height: 70px;
  color: #444;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0 20px 0;
  border: 1px solid #eee;
  padding: 10px 15px;
`;

const TextUserInfoDiv = styled.div`
  width: 82%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const TextUserName = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MemberTag = styled.span`
  color: #fff;
  font-size: 9px;
  background-color: #d04545;
  border-radius: 1rem;
  padding: 5px 8px;
`;

const RegisterDateText = styled.p`
  margin-right: 0.5rem;
  font-size: 13px;
  color: #666;
`;

//MemberResultCard
const WrapForMemberResultCard = styled.div`
  height: 200px;
  display: flex;
  border-radius: 1rem;
  border: 1px solid #eee;
  overflow: hidden;
`;

const MemberResultCardTextBox = styled.div`
  width: 60%;
  overflow: auto;
  text-overflow: ellipsis;
  padding: 10px;
`;
const MemberResultCardImageBox = styled.div`
  width: 40%;
  overflow: hidden;
`;
const MemberResultCardTitle = styled.h3`
  margin-bottom: 10px;
  white-space: noWrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: ${FONT.SIZE.LARGE};
`;

const MemberResultCardText = styled.p`
  font-size: ${FONT.SIZE.MEDIUM};
  color: ${FONT.COLOR.DEEPGRAY};
  margin-bottom: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// mypage
export const WrapForMemberResultCardLsit = styled.div`
  width: 100%;
  margin-top: 15px;
`;

export const MemberResultCardListUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

// non-login
const WrapFromNonLogin = styled.div`
  height: 600px;
  padding: 50px 0 100px 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;
`;

const NonMemberResultButtonBox = styled.div`
  height: 150px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
`;

export const NonMemberResultButton = styled(YellowButton)`
  width: ${MEDIAQUERY.WIDTH_370};
  font-size: ${FONT.SIZE.LARGE};
  height: 2.5rem;

  @media (max-width: ${MEDIAQUERY.WIDTH_375}) {
    width: ${MEDIAQUERY.WIDTH_345};
  }
`;

export const MyPageMemberInfoBox = ({ name, thumbnail, registerDate, role }: Ui.MyPageInfoDivProp) => (
  <WrapForUserInfoDiv>
    <Image src={thumbnail} width="2.5rem" height="2.5rem" borderRadius="1rem" />
    <TextUserInfoDiv>
      <TextUserName>
        <p>{name}</p>
        {role && <MemberTag>{role === LOGIN.ROLE_ADMIN && 'Admin'}</MemberTag>}
      </TextUserName>
      <RegisterDateText>{registerDate?.split('T')[0]}</RegisterDateText>
    </TextUserInfoDiv>
  </WrapForUserInfoDiv>
);

export const MemberResultCard = ({ resultData }: { resultData: Base.MemberTestResult }) => {
  const contentTextArray = resultData.content.split('<br>');

  return (
    // 결과 페이지
    <WrapForMemberResultCard>
      <MemberResultCardImageBox>
        <Image src={resultData.imageUrl} height="100%" object-fit="cover" />
      </MemberResultCardImageBox>
      <MemberResultCardTextBox>
        <MemberResultCardTitle>{resultData.title}</MemberResultCardTitle>
        {contentTextArray.map((text, index) => (
          <MemberResultCardText key={index}>• {text}</MemberResultCardText>
        ))}
      </MemberResultCardTextBox>
    </WrapForMemberResultCard>
  );
};

export const NonLogin = () => {
  const router = useRouter();

  const title = {
    titleText: '로그인이 되어 있지 않아요 🥲',
    contentText: '로그인 하고 나의 결과 기록 확인하기',
  };

  return (
    <Wrap_mediaquery flexDirection="column" justifyContent="space-around" alignItems="center">
      <WrapFromNonLogin>
        <TitleAndText text={title} />
        <MbtiTestStartButton onClick={() => router.push('/login')}>로그인 하러 가기</MbtiTestStartButton>
      </WrapFromNonLogin>
    </Wrap_mediaquery>
  );
};

export const NotForMemberResultData = () => {
  const router = useRouter();

  const title = {
    titleText: '테스트 결과가 없어요!🥹',
    contentText: '몽빗의 테스트를 즐겨봐요 👾 ',
  };

  return (
    <Wrap_mediaquery flexDirection="column" justifyContent="space-around" alignItems="center">
      <WrapFromNonLogin>
        <TitleAndText text={title} />
        <NonMemberResultButtonBox>
          <NonMemberResultButton onClick={() => router.push('/login')}>전체 목록 보기</NonMemberResultButton>
          <NonMemberResultButton onClick={() => router.push('/login')}>최신 테스트 하러 가기</NonMemberResultButton>
          <NonMemberResultButton>랜덤 테스트 하기</NonMemberResultButton>
        </NonMemberResultButtonBox>
      </WrapFromNonLogin>
    </Wrap_mediaquery>
  );
};
