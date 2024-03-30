'use client';

import { styled } from 'styled-components';

import { FONT } from '@/constants/constant';

import { POLICY_STRING } from './content';
import { Wrap_mediaquery } from '@/components/ui/wrap/Wrap';

const PolicyStringElement = styled.p`
  color: ${FONT.COLOR.BLACK};
  font-size: ${FONT.SIZE.SMALL};
  padding: 0 20px 0 20px;
  white-space: pre-line;
`;

export default function Policy() {
  return (
    <Wrap_mediaquery>
      <PolicyStringElement>{POLICY_STRING}</PolicyStringElement>
    </Wrap_mediaquery>
  );
}
