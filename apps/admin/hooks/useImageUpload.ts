import { message } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';
import { useMemo } from 'react';
import { useRecoilState } from 'recoil';

import { initialMbtiImageArray, mbtiImageState } from '@/states/contentUpdateState';

export const useImageUpload = () => {
  const [imageUploads, setImageUploads] = useRecoilState(mbtiImageState);

  // 이미지 전체 업데이트 유효성 체크
  const isAllDataValid = useMemo(() => {
    const isAllImagesUploaded = imageUploads.every((image) => image !== undefined);
    return isAllImagesUploaded;
  }, [imageUploads]);

  // 이미지 파일 유효성
  const isImage = (file: File) => {
    const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    return acceptedImageTypes.includes(file.type);
  };
  const beforeUpload = (file: File) => {
    if (!isImage(file)) {
      message.error('이미지 파일만 업로드할 수 있습니다!');
      return false;
    }
    return true;
  };

  const uploadImage = (index: number, info: UploadChangeParam<UploadFile>) => {
    const { file } = info;

    if (file && file.originFileObj instanceof Blob) {
      setImageUploads((prevUploads: File[]) =>
        prevUploads.map((upload, idx) => (idx === index ? (file.originFileObj as File) : upload)),
      );
    }
  };

  // 업데이트 된 파일 배열
  const fileIndexes: number[] = imageUploads.reduce<number[]>((acc, curr, index) => {
    if (curr instanceof File) {
      acc.push(index);
    }
    return acc;
  }, []);

  // 완료 후 배열 초기화
  const deleteImageFileArray = () => setImageUploads(initialMbtiImageArray);

  return {
    imageUploads,
    isAllDataValid,
    uploadImage,
    fileIndexes,
    deleteImageFileArray,
    beforeUpload,
  };
};
