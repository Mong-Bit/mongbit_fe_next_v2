import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { useImageUpload } from './useImageUpload';
import { postAddMbtiTestAPI, postImageUplodAPI, updateAddMbtiTestAPI } from '@/services/addMbtiTset';

import { isEditTestState, mbtiImageState, mbtiTestDataState } from '@/states/testUpdateDataState';

export const useSaveMbti = () => {
  const { fileIndexes } = useImageUpload();
  const imageUploads = useRecoilValue(mbtiImageState);
  const [mbtiTestData, setMbtiTestData] = useRecoilState(mbtiTestDataState);

  const [loading, setLoading] = useState(false);
  const [updateImgUploading, setUpdateImgUploading] = useState(true);
  const [postImgUploading, setPostImgUploading] = useState(true);
  const [isEditTest, setIsEditTestt] = useRecoilState(isEditTestState);

  const handleImageUpload = async () => {
    setLoading(true);

    try {
      if (fileIndexes.length > 0) {
        const uploadImages: string[] = [];

        if (isEditTest) setUpdateImgUploading(true);
        else setPostImgUploading(true);

        for (const file of imageUploads) {
          if (file !== undefined) {
            const formData = new FormData();
            formData.append('file', file);

            const response = await postImageUplodAPI(formData);
            uploadImages.push(response.data);
          }
          fileIndexes.forEach((idx, index) => {
            if (idx === 0) {
              setMbtiTestData((prev) => ({
                ...prev,
                imageUrl: uploadImages[idx],
              }));
            } else {
              setMbtiTestData((prev) => ({
                ...prev,
                results: prev.results.map((result, i) =>
                  i === idx - 1 ? { ...result, imageUrl: uploadImages[index] } : result,
                ),
              }));
            }
          });
        }
      }
      if (isEditTest) setUpdateImgUploading(false);
      else setPostImgUploading(false);
    } catch (error) {
      alert(`error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const updateMbtiTest = async () => {
      if (!updateImgUploading) {
        try {
          const mbtiTestJSON = JSON.stringify(mbtiTestData);
          await updateAddMbtiTestAPI(mbtiTestJSON);
          alert('테스트 업로드 완료');
        } catch (error) {
          alert(`Error: ${error}`);
        }
        setIsEditTestt(false);
      }
    };
    updateMbtiTest();
  }, [updateImgUploading]);

  useEffect(() => {
    const postAddMbtiTest = async () => {
      if (!postImgUploading) {
        try {
          const mbtiTestJSON = JSON.stringify(mbtiTestData);
          await postAddMbtiTestAPI(mbtiTestJSON);
          alert('테스트 업로드 완료');
        } catch (error) {
          alert(`Error: ${error}`);
        }
      }
    };
    postAddMbtiTest();
  }, [postImgUploading]);

  return {
    loading,
    handleImageUpload,
  };
};
