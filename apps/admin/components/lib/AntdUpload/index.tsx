import { Button, Upload } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';

interface Props {
  onChange: () => void;
}

export const AntdPictureUpload: React.FC<Props> = ({ onChange }) => (
  <Upload
    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
    listType="picture"
    maxCount={1}
    onChange={onChange}
  >
    <Button icon={<UploadOutlined />}>Upload</Button>
  </Upload>
);

export const AntdPictureCardUpload: React.FC<Props> = ({ onChange }) => (
  <Upload
    name="file"
    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
    listType="picture-card"
    onChange={onChange}
    maxCount={1}
  >
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  </Upload>
);
