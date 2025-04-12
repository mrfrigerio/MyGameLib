import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signIn(
    email: string,
    password: string,
  ): Promise<(Omit<User, 'password_hash'> & { access_token: string }) | Error> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);
    }
    const isPasswordValid = await this.usersService.checkUserPassword(
      email,
      password,
    );
    if (!isPasswordValid) {
      throw new HttpException('Senha inválida!', HttpStatus.UNAUTHORIZED);
    }
    const payload = { sub: user.id };
    return {
      ...user,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
