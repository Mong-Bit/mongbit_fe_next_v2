'use client';

import { styled } from 'styled-components';

import { FONT } from '@/constants/constant';

import { TERM_STRING } from '@/app/terms/content';
import { Wrap_mediaquery } from '@/components/ui/wrap/Wrap';

const TermStringElement = styled.p`
  color: ${FONT.COLOR.BLACK};
  font-size: ${FONT.SIZE.SMALL};
  padding: 0 2rem 0 2rem;
  white-space: pre-line;
`;

export default function Terms() {
  return (
    <Wrap_mediaquery>
      <TermStringElement>{TERM_STRING}</TermStringElement>
    </Wrap_mediaquery>
  );
}
