import React from 'react';
import { Select, Space } from 'antd';

const AntdSelect: React.FC = () => {
  const handleChange = (value: string) => {
    console.log(value);
  };

  return (
    <Space wrap>
      <Select defaultValue="선택하기" style={{ width: 120 }} onChange={handleChange} />
    </Space>
  );
};

export default AntdSelect;
