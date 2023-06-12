import { PARCK_ME_SERVER } from '@env';
import { Falsy } from 'react-native';
import { getData } from '../helpers/helpers';

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'UPDATE' | 'DELETE';

export class Service {
  protected defaultEndpoint = PARCK_ME_SERVER;
  protected USER_TOKEN_KEY = 'userToken';
  protected async handleRequest(
    url: string,
    method: RequestMethod = 'GET',
    _headers?: HeadersInit_,
    body?: BodyInit_,
  ) {
    try {
      const savedToken: string | Falsy = await getData(this.USER_TOKEN_KEY);
      console.log('URL', url, method);
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
