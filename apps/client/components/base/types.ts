// MyHeader.tsx

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

// SideMenu.tsx

export interface Show {
  setShowSideMenu: (arg0: boolean) => void;
  showSideMenu: boolean;
}
export interface SideMenuProp {
  show: Show;
}

export type SetLogIn = (arg0: boolean) => void;
export type Router = any;
export type ListElementTitle = {
  logIn?: boolean;
  fontSize?: string;
  padding?: string;
};

export interface SideMenuDivProp {
  height?: string;
  show: Show;
}
