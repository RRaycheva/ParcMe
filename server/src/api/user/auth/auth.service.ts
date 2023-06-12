import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/api/user/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto, LoginDto, AuthResponseDto } from './auth.dto';
import { AuthHelper } from './auth.helper';
import { Request } from 'express';

@Injectable()
export class AuthService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  public async register(body: RegisterDto): Promise<AuthResponseDto | never> {
    const { name, email, password }: RegisterDto = body;
    let user: User = await this.repository.findOne({ where: { email } });

    if (user) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
    }

    user = new User();

    user.name = name;
    user.email = email;
    user.password = this.helper.encodePassword(password);

    const savedUser = await this.repository.save(user);
    const { password: _password, ...simpleUser } = savedUser;
    return { token: this.helper.generateToken(user), user: simpleUser as User };
  }

  public async login(body: LoginDto): Promise<AuthResponseDto | never> {
    const { email, password }: LoginDto = body;
    const user: User = await this.repository.findOne({ where: { email } });

    if (!user) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid: boolean = this.helper.isPasswordValid(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }
    const updatedUser = {
      lastLoginAt: new Date(),
    };
    await this.repository.update(user.id, updatedUser);
    const { password: _password, ...simpleUser } = user;
    return { token: this.helper.generateToken(user), user: simpleUser as User };
  }

  public async refresh(user: User): Promise<AuthResponseDto> {
    const updatedUser = {
      lastLoginAt: new Date(),
    };
    await this.repository.update(user.id, updatedUser);
    const { password: _password, ...simpleUser } = user;
    return { token: this.helper.generateToken(user), user: simpleUser as User };
  }

  public async check(req: Request): Promise<AuthResponseDto | false> {
    try {
      const token = req.get('Authorization').replace('Bearer', '').trim();
      const userDecoded = await this.helper.validate(token);
      const userLoginResponse = await this.refresh(userDecoded);
      return userLoginResponse;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  public async getUserFromToken(token: string) {
    return await this.helper.validate(token);
  }
}
