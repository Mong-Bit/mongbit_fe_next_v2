'use client';

import { Button, Card, Flex, Select, Space, Table } from 'antd';
import Search from 'antd/es/input/Search';
import { ColumnsType } from 'antd/es/table';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { CONTENTS_COUNT_OPTIONS } from '@/constants/constant';
import { PATHS } from '@/constants/paths';
import { useImageUpload } from '@/hooks/useImageUpload';
import { getContentsAPI } from '@/services/contents';
import { initialMbtiTestData, mbtiTestDataState, isEditContentState } from '@/states/contentUpdateState';
import { ContentList, ContentsCover } from '@/types/contents';

import { DeleteButton, EditButton } from '@/components/lib/antd/ContentButtons';

const getColumns = ({ handleDeleteBtn }: { handleDeleteBtn: () => void }): ColumnsType<ContentList> => [
  {
    title: 'Thumbnail',
    key: 'imageUrl',
    width: 120,
    align: 'center',
    render: (_, { imageUrl }) => (
      <div style={{ width: '90px', height: '60px', overflow: 'hidden', position: 'relative', margin: 'auto' }}>
        <Image src={imageUrl} fill sizes="100%" alt="testImage" priority quality={5} />
      </div>
    ),
  },
  {
    title: 'Title',
    key: 'title',
    width: 250,
    render: (_, { title, id }) => <Link href={`contents/${id}/detalis`}>{title}</Link>,
  },
  {
    title: 'Counts',
    children: CONTENTS_COUNT_OPTIONS.map((option) => ({
      title: option.label,
      dataIndex: option.value,
      key: option.value,
      width: 85,
      align: 'center',
    })),
  },
  {
    title: 'Created Date',
    key: 'createDate',
    align: 'center',
    width: 130,
    render: (_, { createDate }) => <p>{new Date(createDate).toLocaleDateString('en-CA')}</p>,
  },
  {
    title: '',
    dataIndex: 'id',
    key: 'id',
    width: 120,
    align: 'center',
    fixed: 'right',
    render: (_, { id }) => (
      <Space size="middle">
        <EditButton testId={id} />
        <DeleteButton testId={id} handleDeleteBtn={handleDeleteBtn} />
      </Space>
    ),
  },
];

const pageSize = 5;

export default function ContentsComponent() {
  const { deleteImageFileArray } = useImageUpload();
  const initializationMbtiTestData = useSetRecoilState(mbtiTestDataState);
  const setIsEditContent = useSetRecoilState(isEditContentState);

  const [page, setPage] = useState(0);
  const [contentsData, setContentsData] = useState<ContentsCover>({
    contentList: [],
    count: 0,
  });

  const router = useRouter();

  const getContents = async (page: number, size: number) => {
    try {
      const response = await getContentsAPI(page, size);
      if (response) {
        setContentsData(response.data);
      }
    } catch (error) {
      alert(`error: ${error}`);
    }
  };

  const onClickRegisterButton = () => {
    initializationMbtiTestData(initialMbtiTestData);
    deleteImageFileArray();
    setIsEditContent(false);
    router.push(PATHS.contentsRegister);
  };

  const columns = useMemo(
    () =>
      getColumns({
        handleDeleteBtn: () => {
          getContents(page, pageSize);
        },
      }),
    [],
  );

  useEffect(() => {
    getContents(page, pageSize);
  }, [page]);

  return (
    <Card style={{ maxWidth: 1400, width: '100%' }}>
      <Flex justify="space-between" align="center" style={{ marginBottom: 30 }}>
        <Flex justify="space-between" align="center" style={{ width: 520 }}>
          <Select style={{ width: 120 }} />
          <p>Member ID</p>
          <Search
            placeholder="input search text"
            onSearch={(value) => alert(`현재 검색 기능을 지원하지 않아, ${value}을(를) 검색할 수 없습니다.`)}
            style={{ width: 300 }}
          />
        </Flex>
        <Button onClick={onClickRegisterButton} type="primary" ghost>
          Add Content
        </Button>
      </Flex>
      <Table
        columns={columns}
        dataSource={contentsData.contentList}
        rowKey="id"
        pagination={{
          position: ['bottomCenter'],
          total: contentsData.count,
          pageSize,
          onChange: (page) => setPage(page - 1),
        }}
      />
    </Card>
  );
}
