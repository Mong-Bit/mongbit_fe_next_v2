'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import * as B from '@/styles/base.style';
import * as L from '@/styles/layout.style';
import theme from '@/styles/theme';
import { MbtiResult } from '@/types';
import { textArray } from '@/utils/common';

import CommentList from '@/components/CommentList';

const MbtiTestResult = ({ mbtiTestResultData }: { mbtiTestResultData: MbtiResult }) => {
  const { title, content, imageUrl, testId } = mbtiTestResultData;
  const contentTextArray = textArray(content);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <B.Wrap_mediaquery $flexDirection="column" padding="10px 30px" gap="30px">
      <B.ImageWrap width="100%" height="450px" $borderRadius="1rem">
        <Image
          src={imageUrl}
          alt={`${title} 이미지`}
          fill
          sizes="100%"
          priority
          quality={100}
          style={{
            objectFit: 'cover',
          }}
        />
      </B.ImageWrap>
      <L.Flex width="100%" $flexDirection="column" gap="30px">
        <B.Title
          $textAlign="center"
          height="40px"
          $backgroundColor={theme.colors.lightPrimaryColor}
          $borderRadius="1rem"
        >
          <h3>{title}</h3>
        </B.Title>
        <L.Flex width="100%" $flexDirection="column" $alignItems="flex-start" gap="10px">
          {contentTextArray.slice(0, 6).map((text, index) => (
            <B.TextEllipsis fontSize={theme.font.size.l} color={theme.colors.black} key={index}>
              <B.IconImage src="/images/mbtiTest/circleIcon.svg" alt="circle" width="0.5rem" margin="0 7px" />
              {text}
            </B.TextEllipsis>
          ))}
        </L.Flex>
        <B.DividingLine />
        {isClient && <CommentList testId={testId} />}
      </L.Flex>
    </B.Wrap_mediaquery>
  );
};
export default MbtiTestResult;