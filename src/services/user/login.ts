import { DOMAIN, request } from '../config';

export const login = async (body: USER_API.LoginBody) => {
  return request(`${DOMAIN}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    data: body,
  });
};
