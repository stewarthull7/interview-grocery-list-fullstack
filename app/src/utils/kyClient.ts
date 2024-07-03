import ky from 'ky'

import { env } from '@constants/env'

const getToken = () => localStorage.getItem('accessToken');

const kyClient = ky.create({
  prefixUrl: env.API_URL,
  hooks: {
    beforeRequest: [
      request => {
        const token = getToken();
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      }
    ]
  }
});

export { kyClient }