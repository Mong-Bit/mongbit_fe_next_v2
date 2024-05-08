'use client';

import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { ANSWER_TYPE } from '@/constants/constant';
import { atomScore } from '@/recoil/atoms';
import * as B from '@/styles/base.style';
import * as L from '@/styles/layout.style';
import theme from '@/styles/theme';
import { makeScore } from '@/utils/mbtiTest';

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
  const setScore = useSetRecoilState(atomScore);
  const [inputArr, setInputArr] = useState([]);

  useEffect(() => {
    setScore([]);
  }, []);

  const questions = data.questions;
  const handleClickAnswer = (type, index) => {
    const value = type === ANSWER_TYPE.PLUS ? 1 : -1;

    const newArr = [...inputArr];
    newArr[index] = value;

    if (stage === 12) {
      const score = makeScore(newArr);
      setScore(score);

      return;
    }

    setInputArr(newArr);
    setStage(stage + 1);
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

              <div onClick={() => handleClickAnswer(ANSWER_TYPE.PLUS, i)}>
                <B.Text>{el.answerPlus}</B.Text>
              </div>
              <div onClick={() => handleClickAnswer(ANSWER_TYPE.MINUS, i)}>
                <B.Text>{el.answerMinus}</B.Text>
              </div>

              {stage > 1 && <PrevButton onClick={() => setStage(stage - 1)}>{'< 이전 질문'}</PrevButton>}
            </L.Flex>
          );
      })}
    </B.Wrap_mediaquery>
  );
}
