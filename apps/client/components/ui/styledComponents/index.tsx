import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

import { IMAGE_ALT_STRING } from '@/constants/constant';
import { MbtiTestPlayCountImage } from '@/public/images/mbtiTest';
import * as B from '@/styles/base.style';
import * as L from '@/styles/layout.style';
import theme from '@/styles/theme';

import { MbtiTestCountImageArea } from '@/components/base/MbtiTestContent';

const SmallTestImageWrap = styled(L.Flex)`
  width: 11rem;
  flex-direction: column;
  gap: 0.3rem;

  @media (max-width: ${theme.devices.width_375}) {
    width: 9.5rem;
  }
`;

export const SeeMoreButton = styled.button<BaseStyle.DivProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-sytle: none;
  background-color: ${(props) => props.backgroundColor ?? props.theme.colors.primaryColor};
  width: ${(props) => props.width ?? '7rem'};
  height: ${(props) => props.height ?? '2rem'};
  border-radius: ${(props) => props.borderRadius ?? '1rem'};
  color: ${(props) => props.color ?? props.theme.colors.deepGray};
  margin: ${(props) => props.margin ?? ''};
`;

const SquareBox = styled(L.Flex)<{ bottom: string }>`
  width: 100%;
  height: 2.5rem;
  background-color: black;
  opacity: 0.7;
  border-radius: 0 0 1rem 1rem;
  position: absolute;
  bottom: ${(props) => props.bottom ?? '0'};
  justify-content: start;
  cursor: pointer;

  & > p {
    color: ${theme.colors.white};
    font-size: ${theme.font.size.s};
    white-space: noWrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0.2rem 0.5rem 0 0.7rem;
  }
`;

export function MbtiTestVersionSmallForSeveral({ mbtiTestData }: Ui.MbtiTestVersionSmallForSeveralProp) {
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

export function MbtiTestForViewPage({ imageUrl, squareText, countData }: Ui.MbtiTestVersionBigProp) {
  return (
    <B.Wrap_mediaquery flexDirection="column">
      <MbtiTestVersionBig imageUrl={imageUrl} squareText={squareText} />
      <MbtiTestCountImageArea countData={countData} />
      <B.DividingLine margin="2rem 0 0 0" />
    </B.Wrap_mediaquery>
  );
}

export const YellowKakaoLoginButton = styled.button<{ url: string }>`
  width: ${theme.devices.width_400};
  max-width: ${theme.devices.width_370};
  height: 3rem;
  background-image: ${(props) => `url(${props.url ?? ''})`};
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: cover;
  margin: 5rem 0 3rem 0;
  border-style: none;

  @media (max-width: ${theme.devices.width_375}) {
    max-width: ${theme.devices.width_345};
  }
`;

export const HeaderButton = styled.button<{ zIndex: string; imageUrl: string; width: string; height: string }>`
  z-index: ${(props) => props.zIndex ?? ''};
  width: ${(props) => props.width ?? ''};
  height: ${(props) => props.height ?? ''};
  border-style: none;
  background: none;
  background-image: url('${(props) => props.imageUrl ?? ''}');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  margin: 0 1rem;
`;
