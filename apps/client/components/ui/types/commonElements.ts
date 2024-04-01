export type Text = {
  color?: string;
  width?: string;
  padding?: string;
  fontSize?: string;
  whiteSpace?: string;
  overflow?: string;
  textOverflow?: string;
  cursor?: string;
  display?: string;
  marginLeft?: string;
  fontWeight?: string;
  margin?: string;
};

export type Wrap = {
  width?: string;
  height?: string;
  margin?: string;
  overflow?: string;
  display?: string;
  flexWrap?: string;
  position?: string;
  right?: string;
  bottom?: string;
  padding?: string;
  flexDirection?: string;
  justifyContent?: string;
  alignItems?: string;
  backgroundColor?: string;
  borderRadius?: string;
  show?: {
    setShowSideMenu: (arg0: boolean) => void;
    showSideMenu: boolean;
  };
  onClick?: (event: React.MouseEvent) => void;
};
