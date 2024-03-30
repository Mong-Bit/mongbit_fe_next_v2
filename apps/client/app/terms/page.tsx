'use client';

import { styled } from 'styled-components';

import { FONT } from '@/constants/constant';

import { TERM_STRING } from './content';
import { Wrap_mediaquery } from '@/components/ui/wrap/Wrap';

const TermStringElement = styled.p`
  color: ${FONT.COLOR.BLACK};
  font-size: ${FONT.SIZE.SMALL};
  padding: 0 20px 0 20px;
  white-space: pre-line;
`;

export default function Terms() {
  return (
    <Wrap_mediaquery>
      <TermStringElement>{TERM_STRING}</TermStringElement>
    </Wrap_mediaquery>
  );
}
