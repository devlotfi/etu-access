import createClient from 'openapi-react-query';
import { fetchClient } from './fetch-client';
import { authMiddelware } from './auth-middleware';

fetchClient.use(authMiddelware);
export const $api = createClient(fetchClient);
