'use client';
import { UploadOutlined } from '@ant-design/icons';
import { PaperClipOutlined } from '@ant-design/icons';
import { Button, Descriptions, Flex, Form, Input, Upload, Image, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { useImageUpload } from '@/hooks/useImageUpload';
import { isEditContentState, mbtiTestDataState } from '@/states/contentUpdateState';

type ResultInputs = {
  title: string;
  content: string;
};
type Inputs = {
  results: ResultInputs[];
};
interface Props {
  onNext: () => void;
  onPrev: () => void;
}

export default function MbtiResult({ onNext, onPrev }: Props) {
  const { isAllDataValid, imageUploads, uploadImage, beforeUpload } = useImageUpload();

  const [resultsData, setResultsData] = useRecoilState(mbtiTestDataState);
  const isEditTest = useRecoilValue(isEditContentState);

  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const [form] = Form.useForm();

  const onSubmit = (values: Inputs) => {
    setResultsData((prev) => ({
      ...prev,
      results: values.results.map((result, index) => ({
        ...prev.results[index],
        title: result.title,
        content: result.content,
      })),
    }));
    onNext();
  };

  useEffect(() => {
    if (isAllDataValid || isEditTest) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [isAllDataValid]);

  return (
    <Form onFinish={onSubmit} form={form} scrollToFirstError>
      <Flex vertical justify="space-between" align="center" gap={20} style={{ margin: '50px 0' }}>
        <h2>Result</h2>

        <Flex wrap="wrap" gap="large" justify="center">
          {resultsData.results.map((results, index) => (
            <Descriptions key={results.result} layout="vertical" bordered>
              <Descriptions.Item label={`${results.result}`} style={{ width: 400 }}>
                <Form.Item name={['results', index, 'title']} initialValue={results.title} rules={[{ required: true }]}>
                  <Input />
                </Form.Item>

                <Form.Item
                  name={['results', index, 'content']}
                  initialValue={results.content.replace(/<br>/g, '\n')}
                  rules={[{ required: true }]}
                >
                  <Input.TextArea autoSize={{ minRows: 4 }} />
                </Form.Item>

                <Form.Item>
                  <Upload
                    name="file"
                    listType="picture"
                    maxCount={1}
                    onChange={(info) => uploadImage(index + 1, info)}
                    beforeUpload={beforeUpload}
                  >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                  <Flex vertical align="center" justify="space-between" gap={15} style={{ marginTop: 20 }}>
                    {imageUploads[index + 1]?.name && (
                      <Space style={{ width: '100%' }}>
                        <PaperClipOutlined />
                        <p>{imageUploads[index + 1].name}</p>
                      </Space>
                    )}
                    {resultsData.results[index].imageUrl && (
                      <Image src={resultsData.results[index].imageUrl} alt="resultImage" width={100} />
                    )}
                  </Flex>
                </Form.Item>
              </Descriptions.Item>
            </Descriptions>
          ))}
        </Flex>
      </Flex>

      <Flex justify="space-between" style={{ margin: 'auto', width: 180 }}>
        <Button onClick={onPrev}>이전</Button>
        <Button htmlType="submit" disabled={isButtonDisabled}>
          다음
        </Button>
      </Flex>
    </Form>
  );
}
