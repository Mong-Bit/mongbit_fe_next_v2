declare global {
  interface Window {
    Kakao: any;
  }
}

export type JwtPayload = {
  auth?: string;
  exp?: number;
};

export interface Button {
  text: string;
  onClick: () => void;
}
