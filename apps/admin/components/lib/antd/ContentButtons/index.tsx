import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';
import { useRouter } from 'next/navigation';
import { useSetRecoilState } from 'recoil';

import { EDIT, PATHS_ID } from '@/constants/paths';
import { useImageUpload } from '@/hooks/useImageUpload';
import { deleteContentAPI } from '@/services/contents';
import { initialMbtiTestData, isEditContentState, mbtiTestDataState } from '@/states/contentUpdateState';
import { messageState } from '@/states/messageState';
import { MessageState } from '@/types/util';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const DeleteButton = ({ testId, handleDeleteBtn }: { testId: string; handleDeleteBtn?: () => void }) => {
  const setMessageState = useSetRecoilState<MessageState>(messageState);
  const queryClient = useQueryClient();

  const { mutate: deleteContent } = useMutation({
    mutationFn: (testId: string) =>
      deleteContentAPI(testId).then(() =>
        setMessageState({
          isOn: true,
          type: 'success',
          content: '삭제 완료',
        }),
      ),
    onSettled: async () => {
      if (handleDeleteBtn) handleDeleteBtn();
      return await queryClient.invalidateQueries({ queryKey: ['getContents'] });
    },
    onError: (error: Error) => {
      setMessageState({
        isOn: true,
        type: 'error',
        content: `Error: ${error.message}`,
      });
    },
  });

  const onClickDeleteBtn = () => {
    if (testId) {
      deleteContent(testId);
    }
  };

  return (
    <Popconfirm
      title="영구 삭제"
      description="테스트가 영구 삭제됩니다. 삭제 하시겠습니까?"
      okText="Yes"
      cancelText="No"
      onConfirm={onClickDeleteBtn}
    >
      <Button size="small" danger>
        <DeleteOutlined key="delete" />
      </Button>
    </Popconfirm>
  );
};

export const EditButton = ({ testId }: { testId: string }) => {
  const setIsEditContent = useSetRecoilState(isEditContentState);
  const { deleteImageFileArray } = useImageUpload();
  const initializationMbtiTestData = useSetRecoilState(mbtiTestDataState);

  const router = useRouter();

  const onClickEditBtn = () => {
    setIsEditContent(true);
    initializationMbtiTestData(initialMbtiTestData);
    deleteImageFileArray();
    router.push(PATHS_ID(testId, EDIT));
  };

  return (
    <Button size="small" type="primary" ghost onClick={() => onClickEditBtn()}>
      <EditOutlined key="edit" />
    </Button>
  );
};
