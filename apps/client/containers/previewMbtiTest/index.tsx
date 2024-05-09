'use client';

import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { useRecoilValue } from 'recoil';

import { IMAGE_ALT_STRING, LOGIN } from '@/constants/constant';
import { useLoadMbtiTestDatas } from '@/hooks/hooks';
import { useAnimationEffect } from '@/hooks/hooks';
import loadingAnimationData from '@/public/animation/loading.json';
import { MbtiTestPlayCountImage } from '@/public/images/mbtiTest';
import { MbtiTestLikeImage, MbtiTestLikedImage } from '@/public/images/mbtiTest';
import { atomlogInState } from '@/recoil/atoms';
import { getLikeState, getMbtiTestCommentData } from '@/services';
import * as B from '@/styles/base.style';
import * as L from '@/styles/layout.style';
import theme from '@/styles/theme';

import MbtiTestCommentArea from '@/components//CommentArea';
import MbtiTestButtonArea from '@/components/ButtonArea';
import { TestItemBig } from '@/components/MbtiTestContent';

export default function PreviewMbtiTest({ mbtiTestData }: Model.PreviewMbtiTest) {
  const userInfo = useRecoilValue(atomlogInState);
  const containerRef = useRef(null);
  const [likeState, setLikeState] = useState(false);
  const [commentPage, setCommentPage] = useState(0);
  const [data, setData] = useState({
    mbtiTestData: { likeCount: null, commentCount: null },
    mbtiTestCommentData: null,
    hasNextPageComment: false,
  });
  const [action, setAction] = useState('');
  const [newCommentArr, setNewCommentArr] = useState([null]);

  const testId = mbtiTestData ? mbtiTestData.test.id : null;

  // hooks
  useAnimationEffect(containerRef, loadingAnimationData);
  useLoadMbtiTestDatas(testId, setData, { commentPage, setCommentPage });

  useEffect(() => {
    getLikeState(testId, userInfo[LOGIN.USER_MEMBER_ID]).then((response) => setLikeState(response?.dataList));
  }, []);

  useEffect(() => {
    const arr = Array(commentPage).fill(null);
    const promises = arr.map((el, i) => getMbtiTestCommentData(testId, i));

    Promise.all(promises).then((response) => {
      response.map((el, i) => (arr[i] = el?.dataList.commentDTOList));
      setNewCommentArr(arr);
    });
  }, [action]);

  useEffect(() => {
    const newData = newCommentArr.flat();
    setData((prev: any) => ({ ...prev, mbtiTestCommentData: newData }));
  }, [newCommentArr]);

  const likeImageUrl = likeState ? MbtiTestLikedImage.src : MbtiTestLikeImage.src;
  const buttonAreaProp = {
    setLikeState,
    testId: testId,
    memberId: userInfo[LOGIN.USER_MEMBER_ID],
    likeState: likeState,
    likeImageUrl: likeImageUrl,
    likeCount: data.mbtiTestData?.likeCount,
  };

  const contentTextArray = mbtiTestData?.test.content.split('<br>');

  if (data.mbtiTestData.likeCount !== null) {
    return (
      <B.Wrap_mediaquery flexDirection="column">
        {/* Mbti 테스트 정보 */}
        <TestItemBig imageUrl={mbtiTestData.test.imageUrl} squareText={mbtiTestData.test.title} />
        <L.Flex width="100%" justifyContent="start">
          <B.ImageWrap width="1rem" height="1rem">
            <Image src={MbtiTestPlayCountImage.src} fill sizes="100%" alt={IMAGE_ALT_STRING + '플레이 횟수 아이콘'} />
          </B.ImageWrap>
          <B.Text margin="0.2rem 0 0 0.2rem" fontSize={theme.font.size.m} color={theme.colors.darkGray}>
            {mbtiTestData.test.playCount}
          </B.Text>
        </L.Flex>

        <B.DividingLine margin="1rem 0 1.5rem 0" />

        <L.Flex flexDirection="column" alignItems="start" width="100%">
          {contentTextArray.map((el: string, id: number) => (
            <B.Text color={theme.colors.darkGray} fontSize={theme.font.size.m} margin="0.2rem 0 0 0" key={`${el}${id}`}>
              {el}
            </B.Text>
          ))}
        </L.Flex>

        {/* Mbti 테스트 시작 버튼 */}
        <B.Button height="2.5rem" fontSize={theme.font.size.l} margin="2rem 0 1rem 0">
          테스트 시작 &gt;
        </B.Button>
        <MbtiTestButtonArea
          data={buttonAreaProp}
          shareDetail={{ imageUrl: mbtiTestData.test.imageUrl, mbtiTestTitle: mbtiTestData.test.title }}
        />

        <B.DividingLine margin="1.5rem 0 3rem 0" />

        {/* Mbti 테스트 댓글 영역 */}
        <MbtiTestCommentArea
          testId={testId}
          commentCount={data.mbtiTestData?.commentCount}
          commentPageSet={{ commentPage, setCommentPage }}
          mbtiTestCommentData={data.mbtiTestCommentData ?? []}
          hasNextPageComment={data.hasNextPageComment}
          setAction={setAction}
        />
      </B.Wrap_mediaquery>
    );
  } else {
    return (
      <B.Wrap_mediaquery position="relative">
        <L.AnimationDiv ref={containerRef} />
      </B.Wrap_mediaquery>
    );
  }
}
