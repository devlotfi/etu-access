import createFetchClient from 'openapi-fetch';
import type { paths } from '../__generated__/schema';

export const fetchClient = createFetchClient<paths>({
  baseUrl: import.meta.env.VITE_API_URL,
});
