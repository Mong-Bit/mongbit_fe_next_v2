export type WrapMediaqueryProp = {
  width?: string;
  margin?: string;
  flexDirection?: string;
  justifyContent?: string;
  alignitems?: string;
  padding?: string;
  position?: string;
  textAlign?: string;
};

export type Wrap = {
  width?: string;
  height?: number;
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
  onClick?: () => void;
};
