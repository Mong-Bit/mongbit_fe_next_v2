import { Card, Flex, Tabs, Image } from 'antd';
import Meta from 'antd/es/card/Meta';
import React from 'react';

import { MbtiQuestions, MbtiResults } from '@/types/contents';

interface Props {
  results: MbtiResults[];
  questions: MbtiQuestions[];
}

const MbtiQuestionsTab = ({ questions }: { questions: MbtiQuestions[] }) => (
  <Flex wrap="wrap" justify="center" gap={20}>
    {questions.map((question) => (
      <Card key={question.id} title={`질문 ${question.index + 1}`} type="inner">
        <Flex
          vertical
          style={{
            width: 220,
            minHeight: 300,
            overflow: 'auto',
          }}
          justify="space-between"
        >
          <p>{question.question.replace(/<br>/g, '\n')}</p>
          <Flex vertical gap={15}>
            <Card hoverable size="small">
              <p>{question.answerPlus}</p>
            </Card>
            <Card hoverable size="small">
              <p>{question.answerMinus}</p>
            </Card>
          </Flex>
        </Flex>
      </Card>
    ))}
  </Flex>
);

const MbtiResultsTab = ({ results }: { results: MbtiResults[] }) => (
  <Flex wrap="wrap" justify="center" gap={20}>
    {results.map((result) => (
      <Card
        type="inner"
        key={result.id}
        style={{
          width: 300,
          height: 400,
          overflow: 'auto',
        }}
        title={result.result}
        cover={<Image alt="resultImage" src={result.imageUrl} height={200} style={{ objectFit: 'cover' }} />}
      >
        <Meta
          title={result.title}
          description={<span style={{ whiteSpace: 'pre-line' }}>◆ {result.content.replace(/<br>/g, '\n' + '◆ ')}</span>}
        />
      </Card>
    ))}
  </Flex>
);

const MbtiTestContent = ({ results, questions }: Props) => {
  const items = [
    {
      key: '1',
      label: 'Questions',
      children: <MbtiQuestionsTab questions={questions} />,
    },
    {
      key: '2',
      label: 'Results',
      children: <MbtiResultsTab results={results} />,
    },
  ];

  return (
    <Card style={{ width: '100%' }}>
      <Tabs defaultActiveKey="1" items={items} />
    </Card>
  );
};

export default MbtiTestContent;
