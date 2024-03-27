'use client';
import { UploadOutlined } from '@ant-design/icons';
import { PaperClipOutlined } from '@ant-design/icons';
import { Button, Descriptions, Form, Input, Upload } from 'antd';
import cx from 'classnames';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { useImageUpload } from '@/hooks/useImageUpload';
import { isEditTestState, mbtiTestDataState } from '@/states/testUpdateDataState';

import styles from './index.module.scss';

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
  const isEditTest = useRecoilValue(isEditTestState);

  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    if (isAllDataValid || isEditTest) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [isAllDataValid]);

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

  return (
    <Form onFinish={onSubmit} form={form} scrollToFirstError>
      <h2 className="title_a">Result</h2>
      <div className={cx(styles.wrap)}>
        {resultsData.results.map((results, index) => (
          <Descriptions key={results.result} layout="vertical" bordered>
            <Descriptions.Item label={`${results.result}`} style={{ width: 400 }}>
              <Form.Item name={['results', index, 'title']} initialValue={results.title} rules={[{ required: true }]}>
                <Input />
              </Form.Item>

              <Form.Item
                name={['results', index, 'content']}
                initialValue={results.content}
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

                <div className={styles.imageWrap}>
                  {resultsData.results[index].imageUrl && (
                    <div style={{ width: 90, height: 90, overflow: 'hidden', objectFit: 'cover', borderRadius: 5 }}>
                      <Image
                        src={resultsData!.results[index]!.imageUrl!}
                        alt="avatar"
                        width={100}
                        height={100}
                        quality={10}
                      />
                    </div>
                  )}
                  <p className={styles.imageFileName}>
                    <PaperClipOutlined />
                    {imageUploads[index + 1]?.name}
                  </p>
                </div>
              </Form.Item>
            </Descriptions.Item>
          </Descriptions>
        ))}
      </div>

      <div className={'button_box'}>
        <Button onClick={onPrev}>이전</Button>
        <Button htmlType="submit" disabled={isButtonDisabled}>
          다음
        </Button>
      </div>
    </Form>
  );
}
