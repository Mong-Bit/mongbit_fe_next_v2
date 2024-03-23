'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import cx from 'classnames';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';

import styles from './index.module.scss';
import { PrevButton, SubmitBtn } from '@/components/common/Buttons';

import { mbtiTestDataState } from '@/states/testDataState';
import { MbtiQuestions } from '@/types/test';

type Inputs = {
  questions: MbtiQuestions[];
};

type MbtiQuestionInputProps = {
  name: `questions.${number}.question` | `questions.${number}.answerPlus` | `questions.${number}.answerMinus`;
  styleName: string;
  title: string;
  error?: FieldError;
  register: UseFormRegister<Inputs>;
};

const schema = z.object({
  questions: z.array(
    z.object({
      question: z.string().min(1).max(500),
      answerPlus: z.string().min(1).max(500),
      answerMinus: z.string().min(1).max(500),
    }),
  ),
});

const MbtiQuestionInput: React.FC<MbtiQuestionInputProps> = ({ name, styleName, title, error, register }) => (
  <div
    className={cx(
      styles.cardContainer,
      'border_g',
      { ['border_r']: error },
      { [styles.questionBox]: styleName === 'question', [styles.answer]: styleName === 'answer' },
    )}
  >
    <p className={styles.title}>{title}</p>
    <textarea className={styles.questioTextarea} {...register(name)} />
  </div>
);

export default function MbtiQuestion() {
  const [questionData, setQuestionData] = useRecoilState(mbtiTestDataState);

  const router = useRouter();

  const questionNames = [
    ['E', 'I'],
    ['N', 'S'],
    ['F', 'T'],
    ['J', 'P'],
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      questions: questionData.questions,
    },
  });

  // console.log(questionData);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const updatedQuestions = data.questions.map((question, index) => ({
      ...question,
      index: index,
    }));

    setQuestionData((prev) => ({
      ...prev,
      questions: updatedQuestions,
    }));

    router.push(`/contents/add/mbti/2`);
  };

  const QuestionBox: React.FC<{ index: number; qName: string[] }> = ({ index, qName }) => (
    <div className={styles.questionCardWrap}>
      <MbtiQuestionInput
        name={`questions.${index}.question`}
        styleName="question"
        title={`질문 ${index + 1}`}
        error={errors?.questions?.[index]?.question}
        register={register}
      />
      <div className={styles.answersBox}>
        <MbtiQuestionInput
          name={`questions.${index}.answerPlus`}
          styleName="answer"
          title={`대답 ${qName[0]}`}
          error={errors?.questions?.[index]?.answerPlus}
          register={register}
        />
        <MbtiQuestionInput
          name={`questions.${index}.answerMinus`}
          styleName="answer"
          title={`대답 ${qName[1]}`}
          error={errors?.questions?.[index]?.answerMinus}
          register={register}
        />
      </div>
    </div>
  );

  return (
    <div className="wrap_add">
      <h2 className="title_add">Question</h2>
      <form className="form_add" onSubmit={handleSubmit(onSubmit)}>
        {questionNames.map((qName, index) => (
          <div key={index} className={cx(styles.questionWarp, 'back_shadow')}>
            <h2 className={styles.questionName}>{`${qName[0]} / ${qName[1]}`}</h2>
            <QuestionBox index={index * 3} qName={qName} />
            <QuestionBox index={index * 3 + 1} qName={qName} />
            <QuestionBox index={index * 3 + 2} qName={qName} />
          </div>
        ))}
        <div className={'button_box'}>
          <PrevButton />
          <SubmitBtn />
        </div>
      </form>
    </div>
  );
}
