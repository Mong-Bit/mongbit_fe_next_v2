import Image from 'next/image';
import Link from 'next/link';

import { CONST_MAIN_PAGE, IMAGE_ALT_STRING } from '@/constants/constant';
import { MbtiTestCommentCountImage, MbtiTestLikeCountImage, MbtiTestPlayCountImage } from '@/public/images/mbtiTest';
import * as B from '@/styles/base.style';
import * as L from '@/styles/layout.style';

import { MbtiTestVersionSmallForSeveral } from '@/components/ui/styledComponents';
import { MbtiTestVersionBig } from '@/components/ui/styledComponents';

export function TitleAndMbtiTestBig({ detail }: Base.TitleAndMbtiTestProps) {
  return (
    <B.Wrap_mediaquery flexDirection="column">
      <B.Title>
        <h3>{detail.titleText}</h3>
      </B.Title>
      <Link href={`/mbti-test/preview/649a7bccaa04db61384808c5`}>
        <MbtiTestVersionBig imageUrl={detail.imageUrl} squareText={detail.squareText} />
      </Link>
    </B.Wrap_mediaquery>
  );
}

export function TitleAndMbtiTestsSmallForSeveral({ mbtiTestData }: Base.TitleAndMbtiTestsSmallForSeveralProp) {
  return (
    <B.Wrap_mediaquery flexDirection="column">
      <B.Title>
        <h3> {CONST_MAIN_PAGE.TITLE_TEXT.LATEST_MBTI_TEST}</h3>
      </B.Title>
      <MbtiTestVersionSmallForSeveral mbtiTestData={mbtiTestData?.testCoverDTOList} />
    </B.Wrap_mediaquery>
  );
}

export function MbtiTestCountImageArea({ countData }: Base.MbtiTestCountImageAreaProp) {
  const countDataArr = [
    { imageUrl: MbtiTestPlayCountImage, data: countData?.playCount },
    { imageUrl: MbtiTestLikeCountImage, data: countData?.likeCount },
    { imageUrl: MbtiTestCommentCountImage, data: countData?.commentCount },
  ];

  return (
    <L.Flex gap="1rem" width="100%" justifyContent="start">
      {countDataArr?.map((el, i) => (
        <L.Flex gap="0.3rem" key={el.imageUrl + i}>
          <B.ImageWrap width="1rem" height="1rem">
            <Image src={el.imageUrl} priority fill sizes="100%" alt={IMAGE_ALT_STRING + '실행 횟수'} />
          </B.ImageWrap>
          <B.Text>{el.data}</B.Text>
        </L.Flex>
      ))}
    </L.Flex>
  );
}
