'use client';

import { Button, Flex, Result } from 'antd';
import { useRouter } from 'next/navigation';

import { PATHS } from '@/constants/paths';

interface Props {
  type: 403 | 404 | 500;
}

const AccessDeniedPage = ({ type }: Props) => {
  const router = useRouter();

  let subTitle = '';
  let btnText = '';
  let onClick = () => {};

  switch (type) {
    case 403:
      subTitle = '접근 권한이 없습니다';
      btnText = 'Go Login';
      onClick = onClickLoginBtn;
      break;
    case 404:
      subTitle = '존재하지 않는 페이지입니다.';
      btnText = 'Back Home';
      onClick = onClickHomeBtn;
      break;
    case 500:
      subTitle = 'Sorry, something went wrong';
      btnText = 'Back Home';
      onClick = onClickHomeBtn;
      break;
    default:
      break;
  }

  function onClickLoginBtn() {
    router.push(PATHS.login);
  }

  function onClickHomeBtn() {
    router.push(PATHS.dashboard);
  }

  return (
    <Flex justify="center" align="center">
      <Result
        status={type}
        title={type}
        subTitle={subTitle}
        extra={
          <Button onClick={onClick} type="primary">
            {btnText}
          </Button>
        }
      />
    </Flex>
  );
};

export default AccessDeniedPage;
