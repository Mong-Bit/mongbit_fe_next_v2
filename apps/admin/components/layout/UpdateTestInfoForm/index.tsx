'use client';

import { Select } from 'antd';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import cx from 'classnames';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';

import { SubmitBtn } from '@/components/common/Buttons';
import styles from './index.module.scss';

import { ContentsSelectOptions } from '@/types/selectOptions';
import { testInfoState } from '@/states/testInfoState';
import { MbtiTest } from '@/types/test';
import { mbtiTestDataState } from '@/states/testDataState';

type Inputs = {
  title: string;
  content: string;
};

const schema = z.object({
  title: z.string().min(1).max(500),
  content: z.string().min(1).max(500),
});

const getContentsSelectOptions = (value: string, label: string, disabled?: boolean) =>
  ({
    label,
    value,
    disabled,
  }) as ContentsSelectOptions;

export default function UpdateTestInfoForm({ testData }: { testData?: MbtiTest }) {
  const [testInfo, setTestInfo] = useRecoilState(testInfoState);
  const setTestInitData = useSetRecoilState(mbtiTestDataState);

  const router = useRouter();
  const selectOptions = [getContentsSelectOptions('mbti', 'MBTI')];

  useEffect(() => {
    const fetchData = async () => {
      testData &&
        setTestInitData((prev) => ({
          ...prev,
          id: testData.id,
          content: testData.content,
          imageUrl: testData.imageUrl,
          questions: testData.questions,
          results: testData.results,
          title: testData.title,
          playCount: testData.playCount,
        }));
    };
    fetchData();
  }, [testData]);

  useEffect(() => {
    testData &&
      setTestInfo((prev) => ({
        ...prev,
        type: testData.type.toLocaleLowerCase(),
      }));
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: testData?.title,
      content: testData?.content,
    },
  });

  const onSelectChange = (value: string) => {
    setTestInfo((prev) => ({
      ...prev,
      type: value,
    }));
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (testInfo.type) {
      setTestInfo((prev) => ({
        ...prev,
        title: data.title,
        content: data.content,
        type: testInfo.type,
      }));
      router.push(`/contents/add/${testInfo.type}/1`);
    }
  };

  return (
    <div className="wrap_add">
      <form className={cx(styles.formWarp, 'form_add', 'back_shadow')} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.titleWarp}>
          <Select
            defaultValue={testInfo.type ? testInfo.type : '선택'}
            style={{ width: 120 }}
            onChange={onSelectChange}
            options={selectOptions}
            disabled={!!testData}
          />
          <div className={styles.titleBox}>
            <label>TITLE</label>
            <input
              className={cx(styles.titleInput, 'border_g', { ['border_r']: errors?.title })}
              {...register('title')}
              placeholder={`Enter ${testInfo.type} test tilte.`}
            />
          </div>
        </div>
        <textarea
          className={cx(styles.contentInput, 'border_g', { ['border_r']: errors?.content })}
          {...register('content')}
          placeholder={`Enter ${testInfo.type} test contents.`}
        />
        {!testInfo.type && <p className={styles.warningMessage}>컨텐츠를 선택 해 주세요</p>}
        <SubmitBtn />
      </form>
    </div>
  );
}
