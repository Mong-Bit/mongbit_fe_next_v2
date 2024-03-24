'use client';
import React from 'react';
import { Button, Result } from 'antd';
import { useRouter } from 'next/navigation';

const SuccessPage: React.FC = () => {
  const router = useRouter();

  const onClickHomeBtn = () => router.push(`/`);
  const onClickContentListBtn = () => router.push(`/contents/list`);
  const onClickAgainBtn = () => router.push(`/contents/add`);

  return (
    <Result
      status="success"
      title="Update successful!"
      subTitle="Please click to navigate to the button."
      style={{ marginTop: '15vh' }}
      extra={[
        <Button onClick={onClickHomeBtn} key="Home">
          Home
        </Button>,
        <Button onClick={onClickContentListBtn} type="primary" key="contentList">
          Content List
        </Button>,
        <Button onClick={onClickAgainBtn} key="buy">
          Buy Again
        </Button>,
      ]}
    />
  );
};

export default SuccessPage;
