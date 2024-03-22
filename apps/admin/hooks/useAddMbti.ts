import { useRecoilState, useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';

import { postAddMbtiTestAPI, postImageUplodAPI, updateAddMbtiTestAPI } from '@/services/addMbtiTset';

import { mbtiImageState } from '@/states/testImageState';
import { mbtiTestDataState } from '@/states/testDataState';
import { MbtiTest } from '@/types/test';

export const useAddMbti = () => {
  const imageUploads = useRecoilValue(mbtiImageState);
  const [imgUploading, setImgUploading] = useState(true);
  const [mbtiTestData, setMbtiTestData] = useRecoilState(mbtiTestDataState);
  const [loading, setLoading] = useState(false);

  const postImageUplod = async () => {
    setLoading(true);
    try {
      const uploadImages: string[] = [];

      setImgUploading(true);

      for (const file of imageUploads) {
        const formData = new FormData();
        formData.append('file', file);

        const response = await postImageUplodAPI(formData);
        uploadImages.push(response.data);
      }

      const uploadResults = uploadImages.slice(1).map((imageUrl, idx) => ({
        ...mbtiTestData.results[idx],
        imageUrl,
      }));

      setMbtiTestData((prev) => ({
        ...prev,
        imageUrl: uploadImages[0],
        results: uploadResults,
      }));
      setImgUploading(false);
    } catch (error) {
      alert(`error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const updateMbtiTest = async (testData: MbtiTest) => {
    try {
      const mbtiTestJSON = JSON.stringify(testData);
      await updateAddMbtiTestAPI(mbtiTestJSON);
      // 페이지 이동 만들기
    } catch (error) {
      alert(`Error: ${error}`);
    } finally {
      alert('테스트 업로드 완료');
    }
  };

  useEffect(() => {
    const handlePostAddMbtiTestAPI = async () => {
      if (!imgUploading) {
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
    handlePostAddMbtiTestAPI();
  }, [imgUploading]);

  return {
    postImageUplod,
    loading,
    updateMbtiTest,
  };
};
