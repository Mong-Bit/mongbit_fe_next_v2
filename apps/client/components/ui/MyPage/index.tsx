import styled from 'styled-components';

import { FONT, LOGIN } from '@/constants/constant';

import { Image } from '@/components/ui/CommonElements';

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
