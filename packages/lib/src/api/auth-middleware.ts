import { Middleware } from 'openapi-fetch';
import { InMemoryStore } from './in-memory-store';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { paths } from '../main';

export const authMiddelware: Middleware = {
  async onRequest({ request }) {
    let accessToken = InMemoryStore.accessToken;

    if (!accessToken) {
      return;
    }

    let expired = false;
    const decoded = jwtDecode(accessToken);
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const expirationTimestamp = decoded.exp;

    const timeRemaining = expirationTimestamp
      ? expirationTimestamp - currentTimestamp
      : 0;
    expired = timeRemaining <= 30;

    if (expired) {
      console.log('renew');

      const { data } = await axios.get<
        paths['/auth/sign-in/refresh-token']['get']['responses']['200']['content']['application/json']
      >('/auth/sign-in/refresh-token', {
        withCredentials: true,
        baseURL: import.meta.env.VITE_API_URL,
      });

      InMemoryStore.accessToken = data.accessToken;
      accessToken = data.accessToken;
    }
    request.headers.set('Authorization', `Bearer ${accessToken}`);
  },
};
