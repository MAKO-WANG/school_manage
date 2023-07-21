import axios, { AxiosRequestConfig } from 'axios';
import { domain } from './domain';

export const URL = domain.url;

export const request = async (config: AxiosRequestConfig) => {
  const token = () => {
    return {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
  };
  const headers = Object.assign(config?.headers || {}, token());
  config.headers = headers;
  console.log(['=> config.headers', headers]);
  try {
    const res = await axios({
      method: 'get',
      timeout: 5000,
      ...config,
    });
    console.log(['=> res', res]);
    if (res.data.code === 0) {
      return Promise.resolve(res.data.data);
    }
    return Promise.reject(res);
  } catch (error) {
    console.log(['=> error', error]);
    return Promise.reject(error);
  }
};
