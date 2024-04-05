import { DOMAIN, KAKAO_INIT_KEY, KAKAO_REST_API_KEY } from '@/constants/domain';

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function setKakaoLogin() {
  if (!window.Kakao.isInitialized()) window.Kakao.init(KAKAO_INIT_KEY);
  window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${DOMAIN}/login/oauth2/kakao/code&response_type=code`;
}
