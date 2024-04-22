'use client';
import { ConfigProvider, theme } from 'antd';
import { useRecoilValue } from 'recoil';

import { isDarkModeState } from '@/states/darkModeState';

const DarkModeProvider = ({ children }: React.PropsWithChildren) => {
  const isDarkMode = useRecoilValue(isDarkModeState);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default DarkModeProvider;
