'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRecoilState } from 'recoil';
import { z } from 'zod';
import cx from 'classnames';
import { useRouter } from 'next/navigation';

import styles from './index.module.scss';
import { PrevButton, SubmitBtn } from '@/components/common/Buttons';

import { mbtiTestDataState } from '@/states/testDataState';
import { MbtiResults } from '@/types/test';

type Inputs = {
  results: MbtiResults[];
};

const schema = z.object({
  results: z.array(
    z.object({
      result: z.string().min(1).max(500),
      title: z.string().min(1).max(500),
      content: z.string().min(1).max(500),
    }),
  ),
});

export default function MbtiResult() {
  const [resultsData, setResultsData] = useRecoilState(mbtiTestDataState);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      results: resultsData.results,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setResultsData((prev) => ({
      ...prev,
      results: data.results,
    }));
    router.push(`/contents/add/mbti/3`);
  };

  return (
    <div className="wrap_add">
      <h2 className="title_add">Result</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={cx(styles.wrap)}>
          {resultsData.results.map((resultName, index) => (
            <div key={resultName.result} className={cx(styles.resultWrap, 'back_shadow')}>
              <p className={styles.resultName}>{resultName.result}</p>
              <div className={styles.titleWrap}>
                <p>Title</p>
                <input
                  className={cx(styles.resultTitle, 'border_g', { ['border_r']: errors?.results?.[index]?.title })}
                  {...register(`results.${index}.title`)}
                />
              </div>
              <div className={styles.contentWrap}>
                <p>Contents</p>
                <textarea
                  className={cx(styles.resultContent, 'border_g', { ['border_r']: errors?.results?.[index]?.content })}
                  {...register(`results.${index}.content`)}
                />
              </div>
            </div>
          ))}
        </div>
        <div className={cx('button_box')}>
          <PrevButton />
          <SubmitBtn />
        </div>
      </form>
    </div>
  );
}
