import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly users = [
    {
        userId: 1,
        username: 'user',
        password: '$2a$10$jrkg/viPP938c4HzHS1jZumrHYY1VCRt99d8k62Pm1iALHEeeiaI.', // hash bcrypt para 'password'
    },
    {
        userId: 2,
        username: 'usuario',
        password: '$2a$10$jrkg/viPP938c4HzHS1jZumrHYY1VCRt99d8k62Pm1iALHEeeiaI.', // hash bcrypt para 'password'
    },
  ];

  constructor(private readonly jwtService: JwtService) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = this.users.find(u => u.username === username);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any): Promise<string> {
    const payload = { username: user.username, sub: user.userId };
    return JSON.stringify({token: this.jwtService.sign(payload), statusCode: 400});
  }
}