import { fetchData } from '.';
import { createHeaders } from './util';

const headers = createHeaders();

export default function redirectKakaoLogin() {
  if (!window.Kakao.isInitialized()) window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_APP_KEY);
  window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_FE_URL_CLIENT}/login/oauth2/kakao/code&response_type=code`;
}

export const getKakaoLoginAPI = (code: string) =>
  fetchData(`/login/oauth2/kakao/code?code=${code}`, 'GET', { headers });
