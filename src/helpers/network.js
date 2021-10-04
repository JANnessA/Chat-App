import {BASE_API_URL} from '../configs';
import {API} from './api';
export function login(params) {
  return API.fetch({
    method: 'POST',
    url: `${BASE_API_URL}/user/login`,
    data: params,
  }).then(response => response.data);
}

export function signUp(params) {
  return API.fetch({
    method: 'POST',
    url: `${BASE_API_URL}/user/create`,
    data: params,
  }).then(response => response.data);
}
