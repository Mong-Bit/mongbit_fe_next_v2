import Image from 'next/image';
import styled from 'styled-components';

import * as B from '@/styles/base.style';
import * as L from '@/styles/layout.style';
import theme from '@/styles/theme';
import { userInfo } from '@/types';

import { LOGIN } from '@/constants';

interface Props extends Omit<userInfo, 'memberId'> {
  role?: string;
}
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

const MemberInfoCard = ({ username, thumbnail, registDate, role }: Props) => (
  <UserInfoBox $justifyContent="space-between">
    <B.ImageWrap width="2.5rem" height="2.5rem" $borderRadius="1rem">
      <Image src={thumbnail} alt={`${name}님 프로필 이미지`} fill sizes="100%" />
    </B.ImageWrap>

    <L.Flex
      width="82%"
      height="100%"
      $flexDirection="column"
      $alignItems="space-between"
      $justifyContent="space-around"
    >
      <L.Flex $justifyContent="space-between">
        <p>{username}</p>
        {role && <MemberTag>{role === LOGIN.ROLE_ADMIN && 'Admin'}</MemberTag>}
      </L.Flex>
      <span>{registDate?.split('T')[0]}</span>
    </L.Flex>
  </UserInfoBox>
);

export default MemberInfoCard;
