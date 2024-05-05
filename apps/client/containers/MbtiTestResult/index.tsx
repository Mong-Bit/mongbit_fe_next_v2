'use client';
import Image from 'next/image';

import * as B from '@/styles/base.style';
import * as L from '@/styles/layout.style';
import theme from '@/styles/theme';
import { textArray } from '@/utils/common';

const MbtiTestResult = ({ mbtiTestResultData }: { mbtiTestResultData: Model.MyPageMbtiResult }) => {
  const { title, content, imageUrl } = mbtiTestResultData;
  const contentTextArray = textArray(content);

  return (
    <B.Wrap_mediaquery flexDirection="column" padding="10px 30px" gap="30px">
      <B.ImageWrap width="100%" height="450px" borderRadius="1rem">
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
      <L.Flex width="100%" flexDirection="column" gap="30px">
        <B.Title textalign="center" height="40px" backgroundColor={theme.colors.lightPrimaryColor} borderRadius="1rem">
          <h3>{title}</h3>
        </B.Title>
        <L.Flex width="100%" flexDirection="column" alignItems="flex-start" gap="10px">
          {contentTextArray.slice(0, 6).map((text, index) => (
            <B.TextEllipsis fontSize={theme.font.size.l} color={theme.colors.black} key={index}>
              <B.IconImage src="/images/mbtiTest/circleIcon.svg" alt="circle" width="0.5rem" margin="0 7px" />
              {text}
            </B.TextEllipsis>
          ))}
        </L.Flex>
        <B.DividingLine />
      </L.Flex>
    </B.Wrap_mediaquery>
  );
};
export default MbtiTestResult;
