import { ClaimParams, Donator } from '@interface';
import axios from 'axios';

const httpClient = axios.create({ baseURL: '/api' });
export const retrieveNonce = async () => {
  const response = await httpClient.get('/nonce').then(({ data }) => data);

  return response.data.nonce;
};

export const claimTokens = async (payload: ClaimParams) => {
  return await httpClient.post('/claim', { ...payload }).then(({ data }) => data);
};

export const addDonator = async (payload: Donator) => {
  return await httpClient.post('/donator', { ...payload }).then(({ data }) => data);
};

export const getDonators = async () => {
  return await httpClient.get('/donators').then(({ data }) => data);
};
