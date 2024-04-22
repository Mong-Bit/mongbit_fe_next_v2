import type { ThemeConfig } from 'antd';

// ConfigProvider 커스텀 스타일링 (임시)
const themeConfig: ThemeConfig = {
  token: {
    fontSize: 16,
    colorBgBase: '#008000', // 기본 배경
    colorPrimary: '#52c41a', // 기본 색상 밝은 배경
    colorPrimaryBg: '#000000', // 메뉴 활성
    colorBgContainer: '52c41a', // 기본 컨테이너 , 버튼 등등
    colorBgElevated: '008000', // 팝업 컨테이너 배경
  },
};

export default themeConfig;
