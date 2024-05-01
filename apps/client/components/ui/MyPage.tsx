import styled from 'styled-components';

import { LOGIN } from '@/constants/constant';

import { Image } from '@/components/ui/CommonElements';

const WrapForUserInfoDiv = styled.div`
  background-color: white;
  width: 100%;
  height: 70px;
  color: #444;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 15px 0;
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
  font-size: 10px;
  background-color: #d04545;
  border-radius: 1rem;
  padding: 5px;
`;

export const RegisterDateText = styled.p`
  margin-right: 0.5rem;
  font-size: 13px;
  color: #666;
`;

export const MyPageUserInfoBox = ({ name, thumbnail, registerDate, role }: Ui.MyPageInfoDivProp) => (
  <WrapForUserInfoDiv>
    <Image src={thumbnail} width="2.5rem" height="2.5rem" borderRadius="1rem" />
    <TextUserInfoDiv>
      <TextUserName>
        <p>{name}</p>
        {role && <MemberTag>{role === LOGIN.ROLE_ADMIN && 'Admin'}</MemberTag>}
      </TextUserName>
      <RegisterDateText>{registerDate!.split('T')[0]}</RegisterDateText>
    </TextUserInfoDiv>
  </WrapForUserInfoDiv>
);
