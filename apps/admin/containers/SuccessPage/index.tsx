'use client';
import { Button, Result } from 'antd';
import { useRouter } from 'next/navigation';

import { PATHS } from '@/constants/paths';

const SuccessPage = () => {
  const router = useRouter();

  const onClickHomeBtn = () => router.push(PATHS.dashboard);
  const onClickContentListBtn = () => router.push(PATHS.contents);
  const onClickAgainBtn = () => router.push(PATHS.contentsRegister);

  return (
    <Result
      status="success"
      title="테스트가 성공적으로 전송 되었습니다!"
      subTitle="원하시는 메뉴로 이동하세요!"
      style={{ marginTop: '15vh' }}
      extra={[
        <Button onClick={onClickHomeBtn} key="Home">
          Dashboard
        </Button>,
        <Button onClick={onClickContentListBtn} type="primary" key="contents">
          Contents
        </Button>,
        <Button onClick={onClickAgainBtn} key="buy">
          Buy Again
        </Button>,
      ]}
    />
  );
};

export default SuccessPage;
