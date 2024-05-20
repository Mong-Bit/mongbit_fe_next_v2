declare namespace BaseStyle {
  type TextProps = {
    color?: string;
    width?: string;
    padding?: string;
    fontSize?: string;
    whiteSpace?: string;
    overflow?: string;
    textOverflow?: string;
    cursor?: string;
    display?: string;
    fontWeight?: string;
    margin?: string;
    textalign?: string;
    $lineHeight?: string;
  };

  type FlexProps = {
    width?: string;
    height?: string;
    $flexDirection?: string;
    $justifyContent?: string;
    $alignItems?: string;
    $flexWrap?: string;
    gap?: string;
    margin?: string;
  };

  type PositionProps = {
    position?: string;
    top?: string;
    bottom?: string;
    right?: string;
    left?: string;
  };

  type DivProps = {
    width?: string;
    height?: string;
    lineHeight?: string;
    color?: string;
    margin?: string;
    padding?: string;
    position?: string;
    fontSize?: string;
    boxShadow?: string;
    textalign?: string;
    $borderRadius?: string;
    $backgroundColor?: string;
    imageUrl?: string;
    zIndex?: string;
  };

  type ImageProps = {
    width?: string;
    height?: string;
    padding?: string;
    margin?: string;
  };
}
