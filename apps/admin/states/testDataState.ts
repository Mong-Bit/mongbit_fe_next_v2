import { atom } from 'recoil';

import { MbtiQuestions, MbtiTest } from '@/types/test';

// test용 나중에 지울 것
const mbtiQuestionsArray: MbtiQuestions[] = [];

for (let i = 0; i < 12; i++) {
  const mbtiQuestion: MbtiQuestions = {
    index: i,
    question: `질문 ${i + 1}`,
    answerPlus: `대답 ${i + 1}-1`,
    answerMinus: `대답 ${i + 1}-2`,
  };
  mbtiQuestionsArray.push(mbtiQuestion);
}

const generateMbtiResultState = () => {
  const resultTitles = [
    'ENFJ',
    'ENFP',
    'ENTJ',
    'ENTP',
    'ESFJ',
    'ESFP',
    'ESTJ',
    'ESTP',
    'INFJ',
    'INFP',
    'INTJ',
    'INTP',
    'ISFJ',
    'ISFP',
    'ISTJ',
    'ISTP',
  ];

  return resultTitles.map((title, idx) => ({
    result: title,
    title: `제목 ${idx + 1}`,
    content: `내용 ${idx + 1}`,
    imageUrl: '',
  }));
};

export const mbtiTestDataState = atom<MbtiTest>({
  key: 'mbtiTestDataState',
  default: {
    title: '',
    content: '',
    questions: mbtiQuestionsArray,
    results: generateMbtiResultState(),
    imageUrl: '',
    type: 'MBTI',
  },
});
