declare namespace Util {
  type LogInState = {
    goPage?: {
      url?: boolean | string;
    };
    key?: string;
    mbRegisterDate?: string;
    mbThumbnail?: string;
    mbToken?: string;
    mbUserID?: string;
    mbUserName?: string;
  };

  type DecodedToken = {
    state?: boolean;
    role?: string;
  } | void;

  type JwtPayload = {
    auth?: string;
    exp?: number;
  };
}
