declare global {
  interface Window {
    Kakao: any;
  }
}

export type JwtPayload = {
  auth?: string;
  exp?: number;
};
