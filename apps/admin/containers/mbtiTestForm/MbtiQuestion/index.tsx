'use client';

import { PaperClipOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Descriptions, Form, Input, Upload } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { Paths } from '@/constants/paths';
import { useImageUpload } from '@/hooks/useImageUpload';
import { mbtiImageState, mbtiTestDataState } from '@/states/contentUpdateState';
import { MbtiQuestions } from '@/types/contents';

import styles from './index.module.scss';

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

  const [form] = Form.useForm();

  const onClickGoContents = () => useRouter().push(Paths.contents);

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
        content: mbtiTestData.content,
      }}
      scrollToFirstError
    >
      <div className={styles.contentBoxes}>
        <h2 className="title_a">Test Introduction</h2>
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
              <p>
                <PaperClipOutlined />
                {imageUploads[0]?.name}
              </p>
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label="Previewing Image URL" labelStyle={{ width: 40 }}>
            <div className={styles.prveImageWrap}>
              {mbtiTestData.imageUrl && (
                <div className={styles.imageBox}>
                  <Image src={mbtiTestData.imageUrl} alt="avatar" width={100} height={100} priority quality={10} />
                </div>
              )}
            </div>
          </Descriptions.Item>
        </Descriptions>
      </div>

      <div className={styles.contentBoxes}>
        <h2 className="title_a">Question</h2>
        {questionNames.map((names, groupIdx) => (
          <div className={styles.formWrap} key={groupIdx}>
            <p className={styles.qNameTag}>{`${names[0]} / ${names[1]}`}</p>
            {mbtiTestData.questions.slice(groupIdx * 3, (groupIdx + 1) * 3).map((questions, index) => (
              <Descriptions key={index} bordered column={2}>
                <Descriptions.Item label={`Q [ ${groupIdx * 3 + index + 1} ]`} span={2}>
                  <Form.Item
                    name={['questions', groupIdx * 3 + index, `question`]}
                    initialValue={questions.question}
                    rules={[{ required: true }]}
                  >
                    <Input.TextArea autoSize={{ minRows: 5 }} />
                  </Form.Item>
                </Descriptions.Item>
                <Descriptions.Item label={`A [ ${questionNames[groupIdx][0]} ]`}>
                  <Form.Item
                    name={['questions', groupIdx * 3 + index, 'answerPlus']}
                    initialValue={questions.answerPlus}
                    rules={[{ required: true }]}
                  >
                    <Input.TextArea autoSize={{ minRows: 4 }} />
                  </Form.Item>
                </Descriptions.Item>
                <Descriptions.Item label={`A [ ${questionNames[groupIdx][1]} ]`}>
                  <Form.Item
                    name={['questions', groupIdx * 3 + index, 'answerMinus']}
                    initialValue={questions.answerMinus}
                    rules={[{ required: true }]}
                  >
                    <Input.TextArea autoSize={{ minRows: 4 }} />
                  </Form.Item>
                </Descriptions.Item>
              </Descriptions>
            ))}
          </div>
        ))}
      </div>
      <div className={'button_box'}>
        <Button onClick={onClickGoContents}>메뉴</Button>
        <Button htmlType="submit" disabled={isButtonDisabled}>
          다음
        </Button>
      </div>
    </Form>
  );
}
