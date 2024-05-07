'use client';

import { useState } from 'react';
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
  const [stage, setStage] = useState(1);
  const questions = data.questions;

  const handleClickAnswer = (type) => {
    switch (type) {
      case 'plus':
        setStage(stage + 1);
        break;
      case 'minus':
        setStage(stage + 1);
        break;
      default:
        break;
    }
  };

  return (
    <B.Wrap_mediaquery flexDirection="column">
      {questions.map((el, i) => {
        if (stage === i + 1)
          return (
            <L.Flex key={el.question + i} flexDirection="column" width="90%">
              <L.Flex flexDirection="column" width="100%" alignItems="baseline">
                <Bar />
                <Bar />

                <L.Flex>
                  <B.Text>{i + 1} /</B.Text>
                  <B.Text>12</B.Text>
                </L.Flex>
              </L.Flex>

              <B.Text>{el.question}</B.Text>

              <div onClick={() => handleClickAnswer('plus')}>
                <B.Text>{el.answerPlus}</B.Text>
              </div>
              <div onClick={() => handleClickAnswer('minus')}>
                <B.Text>{el.answerMinus}</B.Text>
              </div>

              {stage > 1 && <PrevButton onClick={() => setStage(stage - 1)}>{'< 이전 질문'}</PrevButton>}
            </L.Flex>
          );
      })}
    </B.Wrap_mediaquery>
  );
}
