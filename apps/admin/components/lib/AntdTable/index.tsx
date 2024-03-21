import { Table } from 'antd';
import { ColumnsType, TablePaginationConfig } from 'antd/es/table';

interface Props {
  columns?: ColumnsType<any>;
  dataSource?: any[];
  pagination?: false | TablePaginationConfig | undefined;
  title?: string;
}

const AntdTable: React.FC<Props> = ({ columns, dataSource, pagination, title }) => (
  <Table columns={columns} dataSource={dataSource} pagination={pagination} title={() => `${title}`} bordered />
);

export default AntdTable;
