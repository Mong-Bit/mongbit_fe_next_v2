'use client';

import { Select } from 'antd';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import cx from 'classnames';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { SubmitBtn } from '@/components/common/Buttons';
import styles from './index.module.scss';

import { ContentsSelectOptions } from '@/types/selectOptions';
import { testInfoState } from '@/states/testInfoState';

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

const UpdateTestInfoForm = () => {
  const [testInfo, setTestInfo] = useRecoilState(testInfoState);

  const selectOptions = [getContentsSelectOptions('mbti', 'MBTI')];

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: testInfo.title,
      content: testInfo.content,
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
};

export default UpdateTestInfoForm;
