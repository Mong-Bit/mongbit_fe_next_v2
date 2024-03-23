import { useRecoilState, useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';

import { postAddMbtiTestAPI, postImageUplodAPI, updateAddMbtiTestAPI } from '@/services/addMbtiTset';
import { useImageUpload } from './useImageUpload';

import { mbtiImageState } from '@/states/testImageState';
import { mbtiTestDataState } from '@/states/testDataState';
import { isUpdateTestState } from '@/states/testInfoState';

export const useAddMbti = () => {
  const { fileIndexes } = useImageUpload();
  const imageUploads = useRecoilValue(mbtiImageState);
  const [mbtiTestData, setMbtiTestData] = useRecoilState(mbtiTestDataState);

  const [loading, setLoading] = useState(false);
  const [updateImgUploading, setUpdateImgUploading] = useState(true);
  const [postImgUploading, setPostImgUploading] = useState(true);
  const [isUpdateTest, setIsUpdateTest] = useRecoilState(isUpdateTestState);

  const handleImageUpload = async () => {
    setLoading(true);

    try {
      if (fileIndexes.length > 0) {
        const uploadImages: string[] = [];

        if (isUpdateTest) setUpdateImgUploading(true);
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
      if (isUpdateTest) setUpdateImgUploading(false);
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
          // 페이지 이동 만들기
        } catch (error) {
          alert(`Error: ${error}`);
        } finally {
          alert('테스트 업로드 완료');
        }
        setIsUpdateTest(false);
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
          // 페이지 이동 만들기
        } catch (error) {
          alert(`Error: ${error}`);
        } finally {
          alert('테스트 업로드 완료');
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
