import styled from 'styled-components';

import { CONST_FONT, MEDIAQUERY, TEST_ICON } from '@/constants/constant';

import { TestTitleBlackSquareArea } from '@/components/ui/square/Square';
import { TestCountIconImage } from '@/components/ui/button/Button';
import { Text, Wrap } from '@/components/ui/CommonElements';

const Image = styled.img`
  cursor: pointer;
`;

const TestImageBig = styled(Image)`
  width: ${MEDIAQUERY.WIDTH_370};
  height: 240px;
  border-radius: 1rem;
  margin: 0.5rem 0;

  @media (max-width: ${MEDIAQUERY.WIDTH_375}) {
    width: ${MEDIAQUERY.WIDTH_340};
  }
`;

const TestImgageSmall = styled(Image)`
  width: 180px;
  height: 115px;
  object-fit: cover;
  border-radius: 1rem;

  @media (max-width: ${MEDIAQUERY.WIDTH_375}) {
    width: 165px;
    height: 100px;
  }
`;

const Ul = styled.ul`
  width: 230px;
  @media (max-width: ${MEDIAQUERY.WIDTH_375}) {
    width: 210px;
  }
`;

export function TestVersionBig({ imageUrl, squareText }) {
  return (
    <div style={{ paddingRight: '1rem' }}>
      <TestImageBig src={imageUrl} />
      <TestTitleBlackSquareArea text={squareText} />
    </div>
  );
}

export function TestVersionSmallForSeveral({ testData }) {
  return (
    <Wrap width={MEDIAQUERY.WIDTH_420} display="flex" flexwrap="wrap" position="relative" padding="0.5rem 0 0 0">
      {testData.map((e, i) => (
        <Wrap key={e.id + i} style={{ padding: ' 0 0.5rem 0.7rem 0' }}>
          <TestImgageSmall src={e.imageUrl} />
          <Text
            color={CONST_FONT.COLOR.GRAY_1}
            width="150px"
            padding="0 0 0 3px"
            fontSize={CONST_FONT.SIZE.FONT_SIZE_SMALL_1}
            whitespace="nowrap"
            overflow="hidden"
            textoverflow="ellipsis"
            cursor="pointer"
          >
            {e.title}
          </Text>
          <Wrap display="flex" justifyContent="baseline" alignitems="center">
            <TestCountIconImage imageUrl={TEST_ICON.URL.PLAY_COUNT} />
            <Text
              fontSize={CONST_FONT.SIZE.FONT_SIZE_SMALL_1}
              color={CONST_FONT.COLOR.GRAY_1}
              display="inline-block"
              marginleft="3px"
              cursor="pointer"
            >
              {e.playCount}
            </Text>
          </Wrap>
        </Wrap>
      ))}
    </Wrap>
  );
}

export function ImageElement({ imageUrl, style, altStringt }) {
  return <Image src={imageUrl} style={style} alt={altStringt} />;
}

export function MyPageTestResult({ data, altString }) {
  const resultDescriptionArray = data.content.split('<br>');
  return (
    <Wrap margin="0.5rem 0 1rem 1rem" display="flex" justifyContent="center">
      <Image
        src={data.imageUrl}
        alt={altString}
        style={{ width: '120px', objectFit: 'cover', borderRadius: '1rem', marginRight: '0.5rem' }}
      />
      <Wrap height="11rem" overflow="hidden" margin="2px 0 0 5px">
        <Text fontWeight={CONST_FONT.BOLD_SCALE.FIRST} fontSize={CONST_FONT.SIZE.FONT_SIZE_SMALL_1}>
          {data.title}
        </Text>
        <Ul style={{ color: CONST_FONT.COLOR.GRAY_2, fontSize: CONST_FONT.SIZE.FONT_SIZE_SMALL_2 }}>
          {resultDescriptionArray.map((e, i) => (
            <li key={e + i}>{e}</li>
          ))}
        </Ul>
      </Wrap>
    </Wrap>
  );
}
