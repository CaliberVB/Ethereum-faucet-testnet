import { ClaimParams } from '@/pages/api/claim';
import axios from 'axios';

const httpClient = axios.create({ baseURL: '/api' });

export const retrieveNonce = async () => {
  const response = await httpClient.get('/nonce').then(({ data }) => data);

  return response.data.nonce;
};

export const claimTokens = async (payload: ClaimParams) => {
  return await httpClient.post('/claim', { ...payload }).then(({ data }) => data);
};
