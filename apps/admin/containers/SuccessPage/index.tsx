'use client';
import { Button, Result } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';

import { Paths } from '@/constants/paths';

const SuccessPage: React.FC = () => {
  const router = useRouter();

  const onClickHomeBtn = () => router.push(Paths.home);
  const onClickContentListBtn = () => router.push(Paths.contents);
  const onClickAgainBtn = () => router.push(Paths.contentsRegister);

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
        <Button onClick={onClickContentListBtn} type="primary" key="contents">
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
