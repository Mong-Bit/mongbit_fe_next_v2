import Image from 'next/image';
import styled from 'styled-components';

import * as B from '@/styles/base.style';
import * as L from '@/styles/layout.style';
import theme from '@/styles/theme';

import { IMAGE_ALT_TEXT } from '@/constants';

interface Props {
  title?: string;
  content?: number;
  src: string;
  onClick: () => void;
  width?: string;
  height?: string;
  isOn: boolean;
}

const ImageWrapper = styled(L.Flex)<Pick<Props, 'width' | 'height'>>`
  width: ${(props) => `calc(${props.width || '2.5rem'} - 35%)`};
  height: ${(props) => `calc(${props.height || '2.5rem'} - 35%)`};
  position: relative;
  overflow: hidden;
  object-fit: cover;
  margin: auto;
`;

const IconButton = ({ title, content, src, onClick, width, height, isOn }: Props) => (
  <L.Flex $flexDirection="column" gap="5px">
    <B.Button
      width={width || '2.5rem'}
      height={height || '2.5rem'}
      $borderRadius="50%"
      $colorType={isOn ? 'primary' : 'gray'}
      onClick={onClick}
    >
      <ImageWrapper width={width} height={height}>
        <Image src={src} alt={`${IMAGE_ALT_TEXT} ${title} 버튼`} fill sizes="100%" />
      </ImageWrapper>
    </B.Button>
    {title && <B.Text fontSize={theme.font.size.s}>{title}</B.Text>}
    {content && <B.Text>{content}</B.Text>}
  </L.Flex>
);

export default IconButton;
