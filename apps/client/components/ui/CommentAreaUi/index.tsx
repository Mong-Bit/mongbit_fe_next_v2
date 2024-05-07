import styled from 'styled-components';

import * as L from '@/styles/layout.style';
import theme from '@/styles/theme';

export const CommentInput = styled.input<{ borderBottom: string }>`
  width: ${theme.devices.width_370};
  height: 2.5rem;
  padding: 0 4rem 0 1rem;
  margin: 0.3rem 0;
  background-color: ${theme.colors.lightGray};
  font-size: ${theme.font.size.s};
  color: ${theme.colors.deepGray};
  border-radius: 0.3rem;
  border-style: none;
  border-bottom: ${(prop) => prop.borderBottom ?? ''};

  &::placeholder {
    font-size: ${theme.font.size.s};
    color: ${theme.colors.deepGray};
  }

  &:focus {
    outline: none;
  }

  @media (max-width: ${theme.devices.width_375}) {
    width: ${theme.devices.width_340};
  }
`;

export const EachCommentWrap = styled(L.Flex)`
  width: 100%;
  justify-content: start;
  position: relative;
`;

export const CommentDetailWrap = styled.div<{ borderBottom: string; isModifying: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 0.1rem 1rem 0 0.7rem;
  width: 85%;
`;

export const EditInput = styled.input`
  border: none;
  width: ${theme.devices.width_330};
  padding: 0 3.3rem 0.2rem 0;
  outline: none;
  font-size: ${theme.font.size.s};
  border-bottom: 1px solid ${theme.colors.lightGray};
`;
