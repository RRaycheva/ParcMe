import { PARCK_ME_SERVER } from '@env';
import { getData } from '../helpers/helpers';
import { Falsy } from 'react-native';

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'UPDATE';

export class Service {
  protected defaultEndpoint = PARCK_ME_SERVER;
  protected USER_TOKEN_KEY = 'userToken';
  async handleRequest(
    url: string,
    method: RequestMethod = 'GET',
    _headers?: HeadersInit_,
    body?: string,
  ) {
    try {
      const savedToken: string | Falsy = await getData(this.USER_TOKEN_KEY);
      console.log('URL', url, method, body);
      const headers = { ..._headers, Authorization: `Bearer ${savedToken}` };
      const response = await fetch(url, {
        method,
        headers,
        body,
      });

      const jsonResponse = await response.json();
      return await jsonResponse;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
