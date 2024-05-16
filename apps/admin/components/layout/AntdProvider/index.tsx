'use client';
import { message } from 'antd';
import { ConfigProvider, theme } from 'antd';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { isDarkModeState } from '@/states/darkModeState';
import { initMessageStatee, messageState } from '@/states/messageState';

const AntdProvider = ({ children }: React.PropsWithChildren) => {
  const [messageData, setMessageData] = useRecoilState(messageState);
  const isDarkMode = useRecoilValue(isDarkModeState);

  message.config({
    top: 100,
    duration: 2,
    maxCount: 3,
    rtl: true,
    prefixCls: 'my-message',
  });
  const [messageApi, contextHolder] = message.useMessage();

  const setMessageApi = () => {
    messageApi.open({
      type: messageData.type,
      content: messageData.content,
    });
  };

  useEffect(() => {
    if (messageData.isOn) {
      setMessageApi();
      setMessageData(initMessageStatee);
    }
  }, [messageData]);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      {contextHolder}
      {children}
    </ConfigProvider>
  );
};

export default AntdProvider;
