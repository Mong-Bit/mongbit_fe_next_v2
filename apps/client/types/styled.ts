export interface InitStyles {
  width: string;
  height: string;
  color: string;
  margin: string;
  padding: string;
  display: string;
  cursor: string;
  position: string;
  backgroundColor: string;
  borderRadius: string;
}

export interface DivProps extends InitStyles {
  lineHeight: string;
  fontSize: string;
  boxShadow: string;
  textalign: string;
  imageUrl: string;
  zIndex: string;
}

export interface FlexProps extends InitStyles {
  flexDirection: string;
  justifyContent: string;
  alignItems: string;
  flexWrap: string;
  gap: string;
}

export interface TextProps extends InitStyles {
  fontSize: string;
  fontWeight: string;
  whiteSpace: string;
  overflow: string;
  textOverflow: string;
  textalign: string;
}

export interface PositionProps {
  position: string;
  top: string;
  bottom: string;
  right: string;
  left: string;
}