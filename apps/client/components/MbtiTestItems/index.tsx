import Image from 'next/image';
import Link from 'next/link';

import { IMAGE_ALT_STRING } from '@/constants/constant';
import { CommentCountImage, LikeCountImage, PlayCountImage } from '@/public/images/mbtiTest';
import * as B from '@/styles/base.style';
import { SmallTestImageWrap, SquareBox } from '@/styles/Common';
import * as L from '@/styles/layout.style';
import theme from '@/styles/theme';

function CountImageArea({ countData }: Base.CountImageAreaProp) {
  const countDataArr = [
    { imageUrl: PlayCountImage, data: countData?.playCount },
    { imageUrl: LikeCountImage, data: countData?.likeCount },
    { imageUrl: CommentCountImage, data: countData?.commentCount },
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

// 기본 테스트 썸네일 + square text
export function TestItemBig({ imageUrl, squareText }: Ui.TestItemBigProp) {
  return (
    <B.Wrap_mediaquery flexDirection="column">
      <B.ImageWrap width="100%" height={theme.devices.width_240} borderRadius="1rem">
        <Image src={imageUrl ?? ''} alt={IMAGE_ALT_STRING + '썸네일 이미지'} fill sizes="100%" priority />
        <SquareBox bottom="0">
          <p>{squareText}</p>
        </SquareBox>
      </B.ImageWrap>
    </B.Wrap_mediaquery>
  );
}

// 메인페이지 최신 테스트 전용
export function TestItemSmall({ mbtiTestData }: Ui.TestItemSmallProp) {
  return (
    <B.Wrap_mediaquery flexWrap="wrap" alignItems="start" gap="1rem">
      {mbtiTestData?.map((el, i) => (
        <Link key={`${el.id} ${i}`} href={`/mbti-test/preview/${el.id}`}>
          <SmallTestImageWrap>
            <B.ImageWrap width="100%" height="7rem" borderRadius="1rem">
              <Image src={el.imageUrl ?? ''} priority fill sizes="100%" alt={IMAGE_ALT_STRING + '썸네일 이미지'} />
            </B.ImageWrap>

            <B.Title width="100%">
              <B.TextEllipsis>{el.title}</B.TextEllipsis>
            </B.Title>

            <L.Flex justifyContent="start" width="100%" gap="0.2rem">
              <B.ImageWrap width="1rem" height="1rem">
                <Image
                  src={PlayCountImage.src}
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

// 전체 보기, 최신 보기 페이지 전용
export function TestItemWithCount({ imageUrl, squareText, countData }: Ui.TestItemBigProp) {
  return (
    <B.Wrap_mediaquery flexDirection="column">
      <TestItemBig imageUrl={imageUrl} squareText={squareText} />
      <CountImageArea countData={countData} />
      <B.DividingLine margin="2rem 0 0 0" />
    </B.Wrap_mediaquery>
  );
}
