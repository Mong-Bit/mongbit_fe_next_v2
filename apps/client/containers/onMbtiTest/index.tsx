'use client';

import styled from 'styled-components';

import * as B from '@/styles/base.style';
import * as L from '@/styles/layout.style';
import theme from '@/styles/theme';

const Bar = styled.div`
  width: 100%;
  height: 0.3rem;
  background-color: blue;
`;

const PrevButton = styled.button`
  background-color: ${theme.colors.lightBlue};
  width: 5rem;
  height: 3rem;
`;
export default function OnMbtiTest({ data }) {
  return (
    <B.Wrap_mediaquery flexDirection="column">
      <L.Flex flexDirection="column" width="100%" alignItems="baseline">
        <Bar />
        <Bar />

        <L.Flex>
          <B.Text>number /</B.Text>
          <B.Text>12</B.Text>
        </L.Flex>
      </L.Flex>

      <B.Text>{data.questions[0].question}</B.Text>

      <div>
        <B.Text>{data.questions[0].answerPlus}</B.Text>
      </div>
      <div>
        <B.Text>{data.questions[0].answerMinus}</B.Text>
      </div>

      <PrevButton>{'< 이전 질문'}</PrevButton>
    </B.Wrap_mediaquery>
  );
}
