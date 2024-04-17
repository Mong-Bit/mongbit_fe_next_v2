declare namespace StyledComponents {
  interface Show {
    setShowSideMenu: (arg0: boolean) => void;
    showSideMenu: boolean;
  }

  interface SideMenuProp {
    show: Show;
  }

  interface SideMenuDivProp {
    height?: string;
    show: Show;
  }

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
