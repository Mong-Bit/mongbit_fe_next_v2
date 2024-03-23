export type HeaderButtonProp = {
  width: string;
  height: string;
  imageUrl: string;
  zIndex?: number;
};

export type SideMenuState = {
  showSideMenu: boolean;
  setShowSideMenu: React.Dispatch<React.SetStateAction<boolean>>;
};
