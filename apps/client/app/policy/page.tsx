'use client';

import { styled } from 'styled-components';

import * as B from '@/styles/base.style';
import theme from '@/styles/theme';

import { POLICY_STRING } from '@/app/policy/content';

const PolicyStringElement = styled.p`
  color: ${theme.colors.black};
  font-size: ${theme.font.size.s};
  padding: 0 2rem 0 2rem;
  white-space: pre-line;
`;

export default function Policy() {
  return (
    <B.Wrap_mediaquery>
      <PolicyStringElement>{POLICY_STRING}</PolicyStringElement>
    </B.Wrap_mediaquery>
  );
}
