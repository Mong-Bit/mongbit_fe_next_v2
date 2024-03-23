import { useRecoilState, useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';

import { postAddMbtiTestAPI, postImageUplodAPI, updateAddMbtiTestAPI } from '@/services/addMbtiTset';

import { mbtiImageState } from '@/states/testImageState';
import { mbtiTestDataState } from '@/states/testDataState';

export const useAddMbti = () => {
  const imageUploads = useRecoilValue(mbtiImageState);
  const [mbtiTestData, setMbtiTestData] = useRecoilState(mbtiTestDataState);

  const [loading, setLoading] = useState(false);
  const [updateImgUploading, setUpdateImgUploading] = useState(true);
  const [postImgUploading, setPostImgUploading] = useState(true);

  // const handleImageUpload = async () => {
  //   setLoading(true);

  //   try {
  //   } catch (error) {
  //     alert(`error: ${error}`);
  //   }
  // };


  // *****************************************************
  const postImageUplod = async () => {
    setLoading(true);
    try {
      const uploadImages: string[] = [];

      setPostImgUploading(true);

      for (const file of imageUploads) {
        const formData = new FormData();
        formData.append('file', file);

        const response = await postImageUplodAPI(formData);
        uploadImages.push(response.data);
      }
      // 여기서부터
      const uploadResults = uploadImages.slice(1).map((imageUrl, idx) => ({
        ...mbtiTestData.results[idx],
        imageUrl,
      }));

      setMbtiTestData((prev) => ({
        ...prev,
        imageUrl: uploadImages[0],
        results: uploadResults,
      }));

      // 여기까지
      setPostImgUploading(false);
    } catch (error) {
      alert(`error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const updateImageUplod = async (imgIdxArray: number[]) => {
    setLoading(true);
    try {
      if (imgIdxArray.length > 0) {
        const uploadImages: string[] = [];

        setUpdateImgUploading(true);

        for (const file of imageUploads) {
          if (file !== undefined) {
            const formData = new FormData();
            formData.append('file', file);

            const response = await postImageUplodAPI(formData);
            uploadImages.push(response.data);
          }
          // 여기서 부터
          imgIdxArray.forEach((idx, index) => {
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
      // 여기까지
      setUpdateImgUploading(false);
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
      }
    };
    updateMbtiTest();
  }, [updateImgUploading]);

  useEffect(() => {
    const handlePostAddMbtiTestAPI = async () => {
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
    handlePostAddMbtiTestAPI();
  }, [postImgUploading]);

  return {
    postImageUplod,
    loading,
    updateImageUplod,
  };
};
