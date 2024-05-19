type ButtonColor = 'primary' | 'subPoint' | 'gray' | 'white';

export interface ButtonProps {
  width?: string;
  height?: string;
  padding?: string;
  color?: string;
  margin?: string;
  fontSize?: string;
  fontWeight?: string;
  boxShadow?: string;
  $borderRadius?: string;
  // 마이그레이션 종료후 '?' & backgroundColor 삭제 예정 (현재 미적용 컴포넌트 오류 방지)
  $backgroundColor?: string;
  $colorType?: ButtonColor;
}

export interface WrapMediaqueryProps {
  width?: string;
  height?: string;
  $backgroundColor?: string;
  position?: string;
  padding?: string;
  margin?: string;
}

export interface TextProps {
  width?: string;
  height?: string;
  fontSize?: string;
  fontWeight?: string;
  whiteSpace?: string;
  overflow?: string;
  textOverflow?: string;
  margin?: string;
  color?: string;
  padding?: string;
  $textAlign?: string;
  $borderRadius?: string;
  $lineHeight?: string;
  $backgroundColor?: string;
}

export interface PositionProps {
  position?: string;
  top?: string;
  bottom?: string;
  right?: string;
  left?: string;
}

export interface FlexProps {
  width?: string;
  height?: string;
  gap?: string;
  margin?: string;
  $flexDirection?: string;
  $justifyContent?: string;
  $alignItems?: string;
  $flexWrap?: string;
}

export interface IconImageProps {
  width?: string;
  height?: string;
  margin?: string;
  $borderRadius?: string;
}

export interface ListItemProps {
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  padding?: string;
}
