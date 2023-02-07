import { request as umiRequest } from '@umijs/max';

interface RequestResponse<T = any> {
  data?: T;
  code: number;
  msg: string;
}

export const request = async (url: string, opts: IRequestOptions) => {
  try {
    const response = (await umiRequest(
      url,
      opts,
    )) as unknown as RequestResponse;
    console.log(response);
    if (response.code === 0) {
      return Promise.resolve(response.data);
    }
    return Promise.reject(response);
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};
