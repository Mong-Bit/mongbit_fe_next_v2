import { cookies } from 'next/headers';

import { decodeToken } from './utils';
import { TOKEN_NAME } from '@/constants/constant';
import { DecodedToken } from '@/types/login';

export const decodeToken_ssr = () => {
  const token = cookies().get(TOKEN_NAME);
  const decodedToken: DecodedToken = decodeToken(token?.value);

  return {
    state: decodedToken.state,
    role: decodedToken.role,
  };
};

export function getHeaders_ssr(): { Authorization?: string } | undefined {
  const token = cookies().get(TOKEN_NAME);

  if (token) {
    return {
      Authorization: `Bearer ${token.value}`,
    };
  }
  return undefined;
}
