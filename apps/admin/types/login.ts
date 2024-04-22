export type DecodedToken = {
  state: boolean;
  role?: string;
  exp?: number;
  expires?: Date;
};
export type Token = {
  auth: string;
  exp: number;
  sub: string;
};

export type KakaoLogin = {
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
