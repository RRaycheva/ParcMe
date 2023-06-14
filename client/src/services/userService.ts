import { Service } from './baseService';

export interface UserDto {
  id: string | number;
  email: string;
  password: string;
  name: string;
  lastLoginAt: Date;
  isAdmin: boolean;
  profile_picture: string;
}

class UserService extends Service {}

export default new UserService();
