import { UploadChangeParam, UploadFile } from 'antd/es/upload';
import { useMemo } from 'react';
import { useRecoilState } from 'recoil';

import { mbtiImageState } from '@/states/testImageState';

export const useImageUpload = () => {
  const [imageUploads, setImageUploads] = useRecoilState(mbtiImageState);

  // 이미지 업로드
  const isAllDataValid = useMemo(() => {
    const isAllImagesUploaded = imageUploads.every((image) => image !== undefined);
    return isAllImagesUploaded;
  }, [imageUploads]);

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

  return {
    isAllDataValid,
    uploadImage,
    fileIndexes,
  };
};
