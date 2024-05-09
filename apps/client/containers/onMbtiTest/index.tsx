'use client';
import styled from 'styled-components';

import { ANSWER_TYPE } from '@/constants/constant';
import { useInitializeState, useUpdateState } from '@/hooks/useScoreState';
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
  const questions = data.questions;
  const { stage, setStage, clickHandler } = useUpdateState();

  useInitializeState();

  const handleClickAnswer = (type) => {
    clickHandler(type);
  };

  return (
    <B.Wrap_mediaquery flexDirection="column">
      {questions.map((el, i) => {
        if (stage === i)
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

              <div onClick={() => handleClickAnswer(ANSWER_TYPE.PLUS)}>
                <B.Text>{el.answerPlus}</B.Text>
              </div>
              <div onClick={() => handleClickAnswer(ANSWER_TYPE.MINUS)}>
                <B.Text>{el.answerMinus}</B.Text>
              </div>

              {stage > 1 && <PrevButton onClick={() => setStage(stage - 1)}>{'< 이전 질문'}</PrevButton>}
            </L.Flex>
          );
      })}
    </B.Wrap_mediaquery>
  );
}
