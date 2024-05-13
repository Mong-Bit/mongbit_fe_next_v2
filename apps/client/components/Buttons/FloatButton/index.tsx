import * as B from '@/styles/base.style';
import * as L from '@/styles/layout.style';
import theme from '@/styles/theme';
import { PositionProps } from '@/types/styled';

export interface FloatButtonProps extends Omit<PositionProps, 'position'> {
  text: string;
  onClick: () => void;
}

export const FloatButton = ({ text, onClick, ...props }: FloatButtonProps) => (
  <L.Position position="fixed" {...props}>
    <B.Button
      width="40px"
      height="40px"
      borderRadius="50%"
      fontSize={theme.font.size.xs}
      color={theme.colors.black}
      backgroundColor=" #ffc42f88"
      onClick={onClick}
    >
      {text}
    </B.Button>
  </L.Position>
);
