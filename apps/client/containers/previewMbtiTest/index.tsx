'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { useRecoilValue } from 'recoil';

import { IMAGE_ALT_STRING, LOGIN } from '@/constants/constant';
import { PATHS, getTestIdPath } from '@/constants/paths';
import { useLoadMbtiTestDatas, useAnimationEffect } from '@/hooks/hooks';
import loadingAnimationData from '@/public/animation/loading.json';
import { LikeImage, LikedImage, PlayCountImage } from '@/public/images/mbtiTest';
import { atomloginState } from '@/recoil/atoms';
import { getLikeStateAPI, getCommentAPI } from '@/services';
import * as B from '@/styles/base.style';
import * as L from '@/styles/layout.style';
import theme from '@/styles/theme';
import { MbtiTestData } from '@/types';

import CommentArea from '@/components//CommentArea';
import ButtonArea from '@/components/ButtonArea';
import { MbtiTestItem } from '@/components/MbtiTestItem';

export default function PreviewMbtiTest({ mbtiTestData }: { mbtiTestData: MbtiTestData }) {
  const userInfo = useRecoilValue(atomloginState);
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
    getLikeStateAPI(testId, userInfo[LOGIN.USER_MEMBER_ID]).then((response) => setLikeState(response?.data));
  }, []);

  useEffect(() => {
    const arr = Array(commentPage).fill(null);
    const promises = arr.map((el, i) => getCommentAPI(testId, i));

    Promise.all(promises).then((response) => {
      response.map((el, i) => (arr[i] = el?.data.commentDTOList));
      setNewCommentArr(arr);
    });
  }, [action]);

  useEffect(() => {
    const newData = newCommentArr.flat();
    setData((prev: any) => ({ ...prev, mbtiTestCommentData: newData }));
  }, [newCommentArr]);

  const likeImageUrl = likeState ? LikedImage.src : LikeImage.src;
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
      <B.Wrap_mediaquery $flexDirection="column">
        {/* Mbti 테스트 정보 */}
        <MbtiTestItem imageUrl={mbtiTestData.test.imageUrl} squareText={mbtiTestData.test.title} />
        <L.Flex width="100%" $justifyContent="start">
          <B.ImageWrap width="1rem" height="1rem">
            <Image
              src={PlayCountImage.src}
              fill
              sizes="100%"
              alt={IMAGE_ALT_STRING.MONGBIT_TITLE + '플레이 횟수 아이콘'}
            />
          </B.ImageWrap>
          <B.Text margin="0.2rem 0 0 0.2rem" fontSize={theme.font.size.m} color={theme.colors.darkGray}>
            {mbtiTestData.test.playCount}
          </B.Text>
        </L.Flex>

        <B.DividingLine margin="1rem 0 1.5rem 0" />

        <L.Flex $flexDirection="column" $alignItems="start" width="100%">
          {contentTextArray.map((el: string, id: number) => (
            <B.Text color={theme.colors.darkGray} fontSize={theme.font.size.m} margin="0.2rem 0 0 0" key={`${el}${id}`}>
              {el}
            </B.Text>
          ))}
        </L.Flex>

        {/* Mbti 테스트 시작 버튼 */}
        <B.Button height="2.5rem" fontSize={theme.font.size.l} margin="2rem 0 1rem 0">
          <Link href={`${getTestIdPath(testId, PATHS.PLAY)}`}>테스트 시작 &gt;</Link>
        </B.Button>

        <ButtonArea
          data={buttonAreaProp}
          shareDetail={{ imageUrl: mbtiTestData.test.imageUrl, mbtiTestTitle: mbtiTestData.test.title }}
        />

        <B.DividingLine margin="1.5rem 0 3rem 0" />

        {/* Mbti 테스트 댓글 영역 */}
        <CommentArea
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
