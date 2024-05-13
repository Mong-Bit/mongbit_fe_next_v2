'use client';

import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { ANSWER_TYPE } from '@/constants/constant';
import { atomScore } from '@/recoil/atoms';
import * as B from '@/styles/base.style';
import * as L from '@/styles/layout.style';
import { Bar, PrevButton, ResponseBox, Wrap } from '@/styles/OnMbtiTestUi';
import theme from '@/styles/theme';
import { makeScore } from '@/utils/mbtiTest';

export default function OnMbtiTest({ data }) {
  const [bar, setBar] = useState(0);
  const [stage, setStage] = useState(0);
  const [inputArr, setInputArr] = useState([]);
  const setScore = useSetRecoilState(atomScore);

  const questions = data.questions;
  const barWidth = stage === 0 ? 0 : 8.3 * (stage + 1);

  useEffect(() => {
    setScore([]);
  }, []);

  useEffect(() => {
    setBar(barWidth);
  }, [barWidth]);

  const makeScoreArray = (array) => {
    const score = makeScore(array);
    setScore(score);
  };

  const setScoreValue = (type) => {
    const value = type === ANSWER_TYPE.PLUS ? 1 : -1;
    const newArr = [...inputArr];
    newArr[stage] = value;

    if (stage === 11) return makeScoreArray(newArr);
    setInputArr(newArr);
    setStage(stage + 1);
  };

  const handleClickAnswer = (type) => {
    setScoreValue(type);
  };

  return (
    <B.Wrap_mediaquery
      $flexDirection="column"
      $backgroundColor={theme.colors.lightYellow}
      gap="2rem"
      height="100%"
      padding="3rem 0"
    >
      {questions.map((el, i) => {
        if (stage === i)
          return (
            <Wrap key={el.question + i}>
              <L.Flex $flexDirection="column" width="100%" $alignItems="baseline">
                <Bar />
                <Bar width={`${bar}%`} $backgroundColor={theme.colors.primaryColor} />

                <L.Flex>
                  <B.Text margin="0.3rem 0 0 0.2rem" color={theme.colors.black}>
                    {`질문 ${i + 1}`} /
                  </B.Text>
                  <B.Text margin="0.3rem 0 0 0.2rem">12</B.Text>
                </L.Flex>
              </L.Flex>

              <B.Text
                fontSize={theme.font.size.l}
                fontWeight={theme.font.bold.m}
                color={theme.colors.black}
                textalign="center"
                $lineHeight="1.7rem"
                margin="0 0 1rem 0"
              >
                {el.question}
              </B.Text>

              <ResponseBox onClick={() => handleClickAnswer(ANSWER_TYPE.PLUS)}>
                <B.Text textalign="center">{el.answerPlus}</B.Text>
              </ResponseBox>
              <ResponseBox onClick={() => handleClickAnswer(ANSWER_TYPE.MINUS)}>
                <B.Text textalign="center">{el.answerMinus}</B.Text>
              </ResponseBox>

              {stage > 0 && <PrevButton onClick={() => setStage(stage - 1)}>&lt; 이전 질문</PrevButton>}
            </Wrap>
          );
      })}
    </B.Wrap_mediaquery>
  );
}
