import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '2vifmNmhyY2ASDA12YRjSKUAQtvOB8Oaw', // clave secreta
    });
  }
    async validate(payload: any) {
    // Accede al usuario validado
    const user = { userId: payload.sub, username: payload.username };
    // Retorna el usuario si la validación es exitosa
    return user;
  }
}
