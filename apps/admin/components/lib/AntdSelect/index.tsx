import React from 'react';
import { Select, Space } from 'antd';

const AntdSelect: React.FC = () => (
  // const handleChange = (value: string) => {
  //   console.log(value);
  // };

  <Space wrap>
    <Select defaultValue="선택하기" style={{ width: 120 }} />
  </Space>
);
export default AntdSelect;
