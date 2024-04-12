export type DecodedToken = {
  auth: string;
  exp: number;
  sub: string;
};

export type KakaoLoigin = {
  memberId: string;
  username: string;
  thumbnail: string;
  registDate: string;
};

export type LoginTracker = {
  id: string;
  memberId: string;
  loginDate: string;
};
