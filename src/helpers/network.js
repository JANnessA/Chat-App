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

export function getAuth() {
  return API.fetch({
    method: 'GET',
    url: `${BASE_API_URL}/user/me`,
  }).then(response => response.data);
}

export function searchPhone(params) {
  return API.fetch({
    method: 'GET',
    url: `${BASE_API_URL}/user/search`,
    params,
  }).then(response => response.data);
}

export function createConversation(params) {
  return API.fetch({
    method: 'POST',
    url: `${BASE_API_URL}/conversation`,
    data: params,
  }).then(response => response.data);
}

export function getConversations(params) {
  return API.fetch({
    method: 'GET',
    url: `${BASE_API_URL}/conversations`,
    params,
  }).then(response => response.data);
}

export function getContacts(params) {
  return API.fetch({
    method: 'GET',
    url: `${BASE_API_URL}/contacts`,
    params,
  }).then(response => response.data);
}

export function addContact(params) {
  return API.fetch({
    method: 'POST',
    url: `${BASE_API_URL}/contact`,
    data: params,
  }).then(response => response.data);
}

export function cancelAddContact(params) {
  return API.fetch({
    method: 'DELETE',
    url: `${BASE_API_URL}/contact`,
    data: params,
  }).then(response => response.data);
}

export function respondContact(params) {
  return API.fetch({
    method: 'PUT',
    url: `${BASE_API_URL}/contact`,
    data: params,
  }).then(response => response.data);
}

export function getMessages(params) {
  return API.fetch({
    method: 'GET',
    url: `${BASE_API_URL}/messages`,
    params,
  }).then(response => response.data);
}

export function sendMessages(params) {
  return API.fetch({
    method: 'POST',
    url: `${BASE_API_URL}/message`,
    data: params,
  }).then(response => response.data);
}
