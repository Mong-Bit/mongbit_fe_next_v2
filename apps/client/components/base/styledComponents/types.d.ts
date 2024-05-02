declare namespace CommonStyledComponents {
  type Show = {
    setShowSideMenu: (arg0: boolean) => void;
    showSideMenu: boolean;
  };

  type SideMenuProp = {
    show: Show;
  };

  type SideMenuDivProp = {
    height?: string;
    show: Show;
  };

  type HeaderButtonProp = {
    width: string;
    height: string;
    imageUrl: string;
    zIndex?: number;
  };

  type SideMenuState = {
    showSideMenu: boolean;
    setShowSideMenu: React.Dispatch<React.SetStateAction<boolean>>;
  };

  type SetLogIn = (arg0: boolean) => void;
  type Router = any;
  type ListElementTitle = {
    logIn?: boolean;
    fontSize?: string;
    padding?: string;
  };
}
