'use client';

import { PaperClipOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Descriptions, Flex, Form, Input, Upload, Image, Space } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { PATHS } from '@/constants/paths';
import { useImageUpload } from '@/hooks/useImageUpload';
import { mbtiImageState, mbtiTestDataState } from '@/states/contentUpdateState';
import { MbtiQuestions } from '@/types/contents';

interface Inputs {
  title: string;
  content: string;
  questions: MbtiQuestions[];
}

interface Props {
  onNext: () => void;
}

const questionNames = [
  ['E', 'I'],
  ['N', 'S'],
  ['F', 'T'],
  ['J', 'P'],
];

export default function MbtiQuestion({ onNext }: Props) {
  const { uploadImage, beforeUpload } = useImageUpload();
  const [mbtiTestData, setMbtiTestData] = useRecoilState(mbtiTestDataState);
  const imageUploads = useRecoilValue(mbtiImageState);
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const router = useRouter();

  const [form] = Form.useForm();

  const onClickGoContents = () => router.push(PATHS.contents);

  const onSubmit = (values: Inputs) => {
    const updatedQuestions = values.questions.map((question, index) => ({
      ...question,
      index: index,
    }));

    setMbtiTestData((prev) => ({
      ...prev,
      title: values.title,
      content: values.content,
      questions: updatedQuestions,
    }));
    onNext();
  };

  useEffect(() => {
    if (imageUploads[0] || mbtiTestData.imageUrl) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [imageUploads[0]]);

  return (
    <Form
      onFinish={onSubmit}
      form={form}
      initialValues={{
        type: mbtiTestData.type,
        title: mbtiTestData.title,
        content: mbtiTestData.content.replace(/<br>/g, '\n'),
      }}
      scrollToFirstError
    >
      <Flex vertical justify="space-between" align="center" gap={20} style={{ marginTop: 50 }}>
        <h2>Test Introduction</h2>

        <Descriptions bordered column={2} style={{ width: 800 }}>
          <Descriptions.Item labelStyle={{ width: 40 }} label="Title" span={2}>
            <Form.Item name="title" rules={[{ required: true, max: 500 }]}>
              <Input placeholder={`Enter title.`} />
            </Form.Item>
          </Descriptions.Item>

          <Descriptions.Item label="Description" span={2}>
            <Form.Item name="content" rules={[{ required: true, max: 500 }]}>
              <Input.TextArea placeholder={`Enter content.`} autoSize={{ minRows: 5 }} />
            </Form.Item>
          </Descriptions.Item>

          <Descriptions.Item label="Image Upload">
            <Form.Item>
              <Upload
                name="file"
                onChange={(info) => uploadImage(0, info)}
                maxCount={1}
                beforeUpload={beforeUpload}
                listType="picture-card"
              >
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
              {imageUploads[0]?.name && (
                <Space style={{ width: '100%' }}>
                  <PaperClipOutlined />
                  <p>{imageUploads[0].name}</p>
                </Space>
              )}
            </Form.Item>
          </Descriptions.Item>

          <Descriptions.Item label="Previewing Image URL" labelStyle={{ width: 40 }}>
            <Flex align="center" justify="center">
              {mbtiTestData.imageUrl && <Image src={mbtiTestData.imageUrl} alt="testImage" width={100} />}
            </Flex>
          </Descriptions.Item>
        </Descriptions>
      </Flex>

      <Flex vertical justify="space-between" align="center" gap={20} style={{ marginTop: 50 }}>
        <h2>Question</h2>

        {questionNames.map((names, groupIdx) => (
          <Flex vertical gap="middle" key={groupIdx} style={{ marginBottom: 25, width: 800 }}>
            <Card size="small">
              <h3 style={{ textAlign: 'center' }}>{`${names[0]} / ${names[1]}`}</h3>
            </Card>

            {mbtiTestData.questions.slice(groupIdx * 3, (groupIdx + 1) * 3).map((questions, index) => (
              <Descriptions key={index} bordered column={2}>
                <Descriptions.Item label={`Q [ ${groupIdx * 3 + index + 1} ]`} span={2}>
                  <Form.Item
                    name={['questions', groupIdx * 3 + index, `question`]}
                    initialValue={questions.question.replace(/<br>/g, '\n')}
                    rules={[{ required: true }]}
                  >
                    <Input.TextArea autoSize={{ minRows: 5 }} />
                  </Form.Item>
                </Descriptions.Item>
                <Descriptions.Item label={`A [ ${questionNames[groupIdx][0]} ]`}>
                  <Form.Item
                    name={['questions', groupIdx * 3 + index, 'answerPlus']}
                    initialValue={questions.answerPlus.replace(/<br>/g, '\n')}
                    rules={[{ required: true }]}
                  >
                    <Input.TextArea autoSize={{ minRows: 4 }} />
                  </Form.Item>
                </Descriptions.Item>
                <Descriptions.Item label={`A [ ${questionNames[groupIdx][1]} ]`}>
                  <Form.Item
                    name={['questions', groupIdx * 3 + index, 'answerMinus']}
                    initialValue={questions.answerMinus.replace(/<br>/g, '\n')}
                    rules={[{ required: true }]}
                  >
                    <Input.TextArea autoSize={{ minRows: 4 }} />
                  </Form.Item>
                </Descriptions.Item>
              </Descriptions>
            ))}
          </Flex>
        ))}
      </Flex>

      <Flex justify="space-between" style={{ margin: 'auto', width: 180 }}>
        <Button onClick={onClickGoContents}>메뉴</Button>
        <Button htmlType="submit" disabled={isButtonDisabled}>
          다음
        </Button>
      </Flex>
    </Form>
  );
}
