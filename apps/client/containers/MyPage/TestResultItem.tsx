import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

import * as B from '@/styles/base.style';
import * as L from '@/styles/layout.style';
import theme from '@/styles/theme';
import { MbtiResult } from '@/types';

const TestResultItemBox = styled(L.Flex)`
  height: 185px;
  border-radius: 1rem;
  border: 1px solid ${theme.colors.lightGray};
  overflow: hidden;

  & > div:nth-child(2) {
    width: 65%;
    height: 100%;
    padding: 10px;
  }
`;

const TestResultItemTitle = styled(B.TextEllipsis)`
  color: ${theme.colors.black};
  height: 30px;
  line-height: 30px;
  margin-bottom: 10px;
  font-size: ${(props) => props.theme.font.size.l};
  border-bottom: 0.9px solid ${theme.colors.lightGray};
`;

const TestResultItem = ({ resultData }: { resultData: MbtiResult }) => {
    console.log('PSJ: resultData', resultData)
  const contentTextArray = resultData.content.split('<br>');

  return (
    <Link href={`/mbti-test/${resultData.testId}/result/${resultData.testResultId}`}>
      <TestResultItemBox>
        <B.ImageWrap width="35%" height="100%">
          <Image
            src={resultData.imageUrl}
            alt={`${resultData.title} 이미지`}
            fill
            sizes="100%"
            priority
            style={{
              objectFit: 'cover',
            }}
          />
        </B.ImageWrap>
        <div>
          <TestResultItemTitle>{resultData.title}</TestResultItemTitle>
          {contentTextArray.slice(0, 6).map((text, index) => (
            <B.TextEllipsis margin="0 0 5px 0" key={index}>
              • {text}
            </B.TextEllipsis>
          ))}
        </div>
      </TestResultItemBox>
    </Link>
  );
};

export default TestResultItem;
