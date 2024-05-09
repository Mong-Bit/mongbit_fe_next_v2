import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { ANSWER_TYPE } from '@/constants/constant';
import { atomScore } from '@/recoil/atoms';
import { makeScore } from '@/utils/mbtiTest';

export const useInitializeState = () => {
  const setScore = useSetRecoilState(atomScore);
  useEffect(() => {
    setScore([]);
  }, []);
};

export const useUpdateState = () => {
  const [stage, setStage] = useState(0);
  const [inputArr, setInputArr] = useState([]);
  const setScore = useSetRecoilState(atomScore);

  const barWidth = stage === 0 ? 0 : 8.3 * (stage + 1);

  const makeScoreArr = (array) => {
    const score = makeScore(array);
    setScore(score);
  };

  const clickHandler = (type) => {
    const value = type === ANSWER_TYPE.PLUS ? 1 : -1;
    const newArr = [...inputArr];
    newArr[stage] = value;

    if (stage === 11) return makeScoreArr(newArr);
    setInputArr(newArr);
    setStage(stage + 1);
  };

  return { stage, barWidth, setStage, clickHandler };
};
