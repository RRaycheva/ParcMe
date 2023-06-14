import { storeData } from '../helpers/helpers';
import { Service } from './baseService';
import { UserDto } from './userService';

export interface AuthResponseDto {
  token: string;
  user: Omit<UserDto, 'password'>;
}

class AuthService extends Service {
  async check(): Promise<AuthResponseDto | false> {
    try {
      return (await this.handleRequest(
        `${this.defaultEndpoint}/auth/check`,
        'GET',
      )) as AuthResponseDto;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async register(name, email, password): Promise<AuthResponseDto> {
    const headers = { 'Content-Type': 'application/json' };
    const user = JSON.stringify({
      name: name,
      email: email,
      password: password,
    });
    const response = (await this.handleRequest(
      `${this.defaultEndpoint}/auth/register`,
      'POST',
      headers,
      user,
    )) as AuthResponseDto;
    storeData(this.USER_TOKEN_KEY, response.token);
    return response;
  }
  async login(email, password): Promise<AuthResponseDto> {
    const headers = { 'Content-Type': 'application/json' };
    const user = JSON.stringify({ email: email, password: password });
    const response = (await this.handleRequest(
      `${this.defaultEndpoint}/auth/login`,
      'POST',
      headers,
      user,
    )) as AuthResponseDto;
    storeData(this.USER_TOKEN_KEY, response.token);
    return response;
  }
}

export default new AuthService();
