import React from 'react';
import { Input, Space } from 'antd';

import type { SearchProps } from 'antd/es/input/Search';

const { Search } = Input;

const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

const AntdSearchInput: React.FC = () => (
  <Space direction="vertical">
    <Search placeholder="input search text" allowClear onSearch={onSearch} style={{ width: 300 }} />
  </Space>
);

export default AntdSearchInput;
