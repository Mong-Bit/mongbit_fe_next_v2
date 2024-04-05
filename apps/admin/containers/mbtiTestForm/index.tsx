'use client';
import { Steps } from 'antd';
import cx from 'classnames';
import { useEffect, useState } from 'react';

import { useContentData } from '@/hooks/useContentData';
import { MbtiTest } from '@/types/contents';

import styles from './index.module.scss';
import MbtiPreview from '@/containers/MbtiTestForm/MbtiPreview';
import MbtiQuestion from '@/containers/MbtiTestForm/MbtiQuestion';
import MbtiResult from '@/containers/MbtiTestForm/MbtiResult';

interface Props extends React.PropsWithChildren<{ title: string }> {
  title: string;
  testId?: string;
  testData?: MbtiTest;
}

export default function MbtiTestForm({ title, testId }: Props) {
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const { getContent } = useContentData();

  const onNext = () => setCurrentIndex((prev) => prev + 1);
  const onPrev = () => setCurrentIndex((prev) => prev - 1);

  useEffect(() => {
    const fetchData = async () => {
      testId && (await getContent(testId));
      setCurrentIndex(0);
    };

    if (testId) {
      fetchData();
    } else {
      setCurrentIndex(0);
    }
  }, [testId]);


  return (
    <div className={cx(styles.wrap, 'gray')}>
      <h2 className={styles.title}> {title} </h2>
      <Steps
        current={currentIndex}
        size="small"
        className={styles.steps}
        items={[
          {
            title: '소개와 질문',
            description: '소개와 질문을 입력하세요',
          },
          {
            title: '결과',
            description: '결과를 입력하세요',
          },
          {
            title: '확인',
            description: '확인 하세요',
          },
        ]}
      />
      <div className={styles.contents}>
        {currentIndex === 0 && <MbtiQuestion onNext={onNext} />}
        {currentIndex === 1 && <MbtiResult onNext={onNext} onPrev={onPrev} />}
        {currentIndex === 2 && <MbtiPreview onPrev={onPrev} />}
      </div>
    </div>
  );
}
