import Image from 'next/image';
import styled from 'styled-components';

import * as B from '@/styles/base.style';
import * as L from '@/styles/layout.style';
import theme from '@/styles/theme';

interface Props {
  title?: string;
  content?: number;
  src: string;
  onClick: () => void;
  width?: string;
  height?: string;
  $isOn: boolean;
}

const Button = styled.button<Pick<Props, 'width' | 'height' | '$isOn'>>`
  width: ${(props) => props.width || '2.5rem'};
  height: ${(props) => props.height || '2.5rem'};
  border-radius: 50%;
  cursor: pointer;
  background-color: ${(props) => (props.$isOn ? theme.colors.primaryColor : theme.colors.darkGray)};
`;

const ImageWrapper = styled(L.Flex)<Pick<Props, 'width' | 'height'>>`
  width: ${(props) => `calc(${props.width || '2.5rem'} - 35%)`};
  height: ${(props) => `calc(${props.height || '2.5rem'} - 35%)`};
  position: relative;
  overflow: hidden;
  object-fit: cover;
  margin: auto;
`;

const IconButton = ({ title, content, src, onClick, ...props }: Props) => (
  <L.Flex flexDirection="column" gap="5px">
    <Button {...props} onClick={onClick}>
      <ImageWrapper width={props.width} height={props.height}>
        <Image src={src} alt={`${title} 버튼`} fill sizes="100%" />
      </ImageWrapper>
    </Button>
    {title && <B.Text fontSize={theme.font.size.s}>{title}</B.Text>}
    {content && <B.Text>{content}</B.Text>}
  </L.Flex>
);

export default IconButton;
