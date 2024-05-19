'use client';

import { styled } from 'styled-components';

import * as B from '@/styles/base.style';
import theme from '@/styles/theme';

import { TERM_STRING } from '@/app/terms/content';

const TermStringElement = styled.p`
  color: ${theme.colors.black};
  font-size: ${theme.font.size.s};
  padding: 0 2rem 0 2rem;
  white-space: pre-line;
`;

export default function Terms() {
  return (
    <B.Wrap_mediaquery>
      <TermStringElement>{TERM_STRING}</TermStringElement>
    </B.Wrap_mediaquery>
  );
}
