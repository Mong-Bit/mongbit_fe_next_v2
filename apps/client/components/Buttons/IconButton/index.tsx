import styled, { css } from 'styled-components';

import * as B from '@/styles/base.style';
import * as L from '@/styles/layout.style';
import theme from '@/styles/theme';

interface Props {
  text: string;
  count?: number;
  src: string;
  onClick: () => void;
  width?: string;
  height?: string;
  isOn: boolean;
}

const Button = styled.button<Pick<Props, 'width' | 'height' | 'isOn'>>`
  width: ${(props) => props.width ?? '2.5rem'};
  height: ${(props) => props.height ?? '2.5rem'};
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  padding: 8px;

  ${(props) => {
    if (props.isOn) {
      return css`
        background-color: ${theme.colors.primaryColor};
      `;
    } else {
      return css`
        background-color: ${theme.colors.darkGray};
      `;
    }
  }}
`;

const IconButton = ({ text, count, src, onClick, ...props }: Props) => (
  <L.Flex flexDirection="column" gap="5px">
    <Button {...props} onClick={onClick}>
      <B.IconImage src={src} alt={`${text} 버튼`} />
    </Button>
    <B.Text fontSize={theme.font.size.m}>{text}</B.Text>
    <B.Text>{count}</B.Text>
  </L.Flex>
);

export default IconButton;
