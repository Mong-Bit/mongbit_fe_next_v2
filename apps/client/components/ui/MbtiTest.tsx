'use client';
import styled from 'styled-components';

import { FONT, MEDIAQUERY } from '@/constants/constant';
import { MbtiTestPlayCountImage } from '@/public/images/mbtiTest';

import { MbtiTestCountImageArea } from '@/components/base/MbtiTestContent';
import { MbtiTestCountIconImage } from '@/components/ui/Button';
import { Text, Wrap, Image, Stroke } from '@/components/ui/CommonElements';
import { MbtiTestTitleBlackSquareArea } from '@/components/ui/Square';
import { Wrap_mediaquery } from '@/components/ui/Wrap';

const MbtiTestImageBig = styled(Image)`
  width: ${MEDIAQUERY.WIDTH_370};
  height: 15rem;
  border-radius: 1rem;
  margin: 0.5rem 0;

  @media (max-width: ${MEDIAQUERY.WIDTH_375}) {
    width: ${MEDIAQUERY.WIDTH_345};
  }
`;

const MbtiTestImageSmall = styled(Image)`
  width: 11.2rem;
  height: 7rem;
  object-fit: cover;
  border-radius: 1rem;

  @media (max-width: ${MEDIAQUERY.WIDTH_375}) {
    width: 10.3rem;
    height: 7rem;
  }
`;

const WrapForSmallMbtiTest = styled.div`
  background-color: white;
  width: ${MEDIAQUERY.WIDTH_420};
  display: flex;
  position: relative;
  flex-wrap: wrap;
  padding: 0.5rem 0 0 0;
  justify-content: space-evenly;

  @media (max-width: ${MEDIAQUERY.WIDTH_375}) {
    width: ${MEDIAQUERY.WIDTH_375};
  }
`;

export function MbtiTestVersionBig({ imageUrl, squareText }: Ui.MbtiTestVersionBigProp) {
  return (
    <Wrap_mediaquery alignItems="center" flexDirection="column" margin="0 0 -2rem 0">
      <MbtiTestImageBig src={imageUrl} />
      <MbtiTestTitleBlackSquareArea text={squareText} bottom="2.8rem" />
    </Wrap_mediaquery>
  );
}

export function MbtiTestVersionSmallForSeveral({ mbtiTestData }: Ui.MbtiTestVersionSmallForSeveralProp) {
  return (
    <WrapForSmallMbtiTest>
      {mbtiTestData?.map((e, i) => (
        <Wrap key={`${e.id} ${i}`} padding="0 0 0.7rem 0">
          <MbtiTestImageSmall src={e.imageUrl} />
          <Text
            color={FONT.COLOR.DARKGRAY}
            width="10rem"
            padding="0 0 0 0.2rem"
            fontSize={FONT.SIZE.SMALL}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
            cursor="pointer"
          >
            {e.title}
          </Text>
          <Wrap display="flex" justifyContent="baseline" alignItems="center">
            <MbtiTestCountIconImage imageUrl={MbtiTestPlayCountImage.src} />
            <Text
              fontSize={FONT.SIZE.SMALL}
              color={FONT.COLOR.DARKGRAY}
              display="inline-block"
              marginLeft="0.2rem"
              cursor="pointer"
            >
              {e.playCount}
            </Text>
          </Wrap>
        </Wrap>
      ))}
    </WrapForSmallMbtiTest>
  );
}

export function MbtiTestForViewPage({ imageUrl, squareText, countData }: Ui.MbtiTestVersionBigProp) {
  return (
    <Wrap margin="1rem 0 0 0">
      <MbtiTestImageBig src={imageUrl} />
      <MbtiTestTitleBlackSquareArea text={squareText} bottom="3.2rem" />
      <MbtiTestCountImageArea countData={countData} />
      <Stroke position="relative" bottom="1.2rem" />
    </Wrap>
  );
}
