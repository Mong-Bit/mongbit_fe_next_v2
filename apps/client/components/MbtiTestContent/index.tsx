import Image from 'next/image';
import Link from 'next/link';

import { CONST_MAIN_PAGE, IMAGE_ALT_STRING } from '@/constants/constant';
import { PATHS, GENERATE_PATHS_TEST_ID } from '@/constants/paths';
import { MbtiTestCommentCountImage, MbtiTestLikeCountImage, MbtiTestPlayCountImage } from '@/public/images/mbtiTest';
import * as B from '@/styles/base.style';
import { SmallTestImageWrap, SquareBox } from '@/styles/Common';
import * as L from '@/styles/layout.style';
import theme from '@/styles/theme';

export function TitleAndMbtiTestBig({ detail }: Base.TitleAndMbtiTestProps) {
  return (
    <B.Wrap_mediaquery $flexDirection="column">
      <B.Title>
        <h3>{detail.titleText}</h3>
      </B.Title>
      <Link href={GENERATE_PATHS_TEST_ID('649a7bccaa04db61384808c5', PATHS.PREVIEW)}>
        <MbtiTestVersionBig imageUrl={detail.imageUrl} squareText={detail.squareText} />
      </Link>
    </B.Wrap_mediaquery>
  );
}

export function TitleAndMbtiTestsSmallForSeveral({ mbtiTestData }: Base.TitleAndMbtiTestsSmallForSeveralProp) {
  return (
    <B.Wrap_mediaquery $flexDirection="column">
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
    <L.Flex gap="1rem" width="100%" $justifyContent="start">
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

export function MbtiTestVersionSmallForSeveral({ mbtiTestData }: Ui.MbtiTestVersionSmallForSeveralProp) {
  return (
    <B.Wrap_mediaquery $flexWrap="wrap" $alignItems="start" gap="1rem">
      {mbtiTestData?.map((el, i) => (
        <Link key={`${el.id} ${i}`} href={GENERATE_PATHS_TEST_ID(el.id, PATHS.PREVIEW)}>
          <SmallTestImageWrap>
            <B.ImageWrap width="100%" height="7rem" $borderRadius="1rem">
              <Image src={el.imageUrl ?? ''} priority fill sizes="100%" alt={IMAGE_ALT_STRING + '썸네일 이미지'} />
            </B.ImageWrap>

            <B.Title width="100%">
              <B.TextEllipsis>{el.title}</B.TextEllipsis>
            </B.Title>

            <L.Flex $justifyContent="start" width="100%" gap="0.2rem">
              <B.ImageWrap width="1rem" height="1rem">
                <Image
                  src={MbtiTestPlayCountImage.src}
                  priority
                  fill
                  sizes="100%"
                  alt={IMAGE_ALT_STRING + '플레이 횟수 아이콘'}
                />
              </B.ImageWrap>
              <B.Title>
                <p>{el.playCount}</p>
              </B.Title>
            </L.Flex>
          </SmallTestImageWrap>
        </Link>
      ))}
    </B.Wrap_mediaquery>
  );
}

export function MbtiTestVersionBig({ imageUrl, squareText }: Ui.MbtiTestVersionBigProp) {
  return (
    <B.Wrap_mediaquery $flexDirection="column">
      <B.ImageWrap width="100%" height={theme.devices.width_240} $borderRadius="1rem">
        <Image src={imageUrl ?? ''} alt={IMAGE_ALT_STRING + '썸네일 이미지'} fill sizes="100%" priority />
        <SquareBox bottom="0">
          <p>{squareText}</p>
        </SquareBox>
      </B.ImageWrap>
    </B.Wrap_mediaquery>
  );
}

export function MbtiTestForViewPage({ imageUrl, squareText, countData }: Ui.MbtiTestVersionBigProp) {
  return (
    <B.Wrap_mediaquery $flexDirection="column">
      <MbtiTestVersionBig imageUrl={imageUrl} squareText={squareText} />
      <MbtiTestCountImageArea countData={countData} />
      <B.DividingLine margin="2rem 0 0 0" />
    </B.Wrap_mediaquery>
  );
}
