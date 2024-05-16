'use client';

import { Button, Flex, Result } from 'antd';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Flex justify="center" align="center">
      <Result
        title="Something went wrong!"
        subTitle={error && `${error.message}`}
        extra={<Button onClick={() => reset()}>Try again</Button>}
      />
    </Flex>
  );
}
