'use client';
import { UpOutlined, DownOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Card, Flex, FloatButton, Spin, Steps } from 'antd';
import { useState } from 'react';

import MbtiPreview from '@/containers/MbtiTestForm/MbtiPreview';
import MbtiQuestion from '@/containers/MbtiTestForm/MbtiQuestion';
import MbtiResult from '@/containers/MbtiTestForm/MbtiResult';
import { getContentAPI } from '@/services/contents';
import { mbtiTestDataState } from '@/states/contentUpdateState';
import { MbtiTest } from '@/types/contents';
import { useQuery } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';

interface Props extends React.PropsWithChildren<{ title: string }> {
  title: string;
  testId?: string;
}

export default function MbtiTestForm({ title, testId }: Props) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const setContentData = useSetRecoilState<MbtiTest>(mbtiTestDataState);

  const { isLoading } = useQuery({
    queryKey: ['getContent', testId],
    queryFn: () =>
      getContentAPI(testId!).then((res) => {
        setContentData(res.data.test);
        return res.data.test;
      }),
    enabled: !!testId,
    gcTime: 0,
  });

  const onNext = () => setCurrentIndex((prev) => prev + 1);
  const onPrev = () => setCurrentIndex((prev) => prev - 1);

  const onClickUpBtn = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const onClickDownBtn = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <Card style={{ padding: 20 }}>
      <Flex vertical justify="center" align="center" gap="large">
        <h2> {title} </h2>
        <Steps
          current={currentIndex}
          size="small"
          style={{ maxWidth: 750 }}
          items={[
            {
              title: 'Test Info & Question',
              description: '소개와 질문을 입력하세요',
            },
            {
              title: 'Result',
              description: '결과를 입력하세요',
            },
            {
              title: 'Preview',
              description: '전송 전 확인하세요',
            },
          ]}
        />
        {isLoading ? (
          <Spin />
        ) : (
          <>
            {currentIndex === 0 && <MbtiQuestion onNext={onNext} />}
            {currentIndex === 1 && <MbtiResult onNext={onNext} onPrev={onPrev} />}
            {currentIndex === 2 && <MbtiPreview onPrev={onPrev} />}
          </>
        )}
      </Flex>
      <FloatButton.Group
        trigger="click"
        type="primary"
        style={{
          right: 94,
        }}
        icon={<EllipsisOutlined />}
      >
        <FloatButton onClick={onClickUpBtn} icon={<UpOutlined />} />
        <FloatButton onClick={onClickDownBtn} icon={<DownOutlined />} />
      </FloatButton.Group>
    </Card>
  );
}
