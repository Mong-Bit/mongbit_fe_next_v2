'use client';

import { Card, Flex, Row } from 'antd';
import cx from 'classnames';
import { useEffect } from 'react';

import { useContentData } from '@/hooks/useContentData';
import { MbtiTest } from '@/types/contents';

import styles from './index.module.scss';
import MbtiInfoCard from './MbtiTestInfoCard';
import CountCard from '@/components/lib/antd/CountCard';

interface Props {
  testData: MbtiTest;
}

export default function ContenDetalis({ testData }: Props) {
  const { id, title, type, imageUrl, createDate, results, questions, playCount } = testData;
  const { getContentCounts, contentCountData } = useContentData();

  useEffect(() => {
    id && getContentCounts(id);
  }, []);

  return (
    <Flex wrap="wrap" gap="large" justify="center" className={styles.wrap}>
      <MbtiInfoCard
        title={title}
        type={type}
        imageUrl={imageUrl}
        createDate={createDate}
        resultsLength={results.length}
        questionsLength={questions.length}
      />

      <Card title="Insight">
        <Flex wrap="wrap" gap="small" justify="space-between" className={styles.cardWrap}>
          {[{ name: 'Play', count: playCount! }, ...contentCountData].map((count) => (
            <CountCard key={count.name} countName={count.name} countNum={count.count} hover={false} />
          ))}
        </Flex>
      </Card>
    </Flex>
  );
}
