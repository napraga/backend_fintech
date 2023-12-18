import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt'; // Ajusta la importación según tu configuración

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    // Verificar la existencia del token en el encabezado de autorización
    const token = this.extractTokenFromHeader(request.headers.authorization);

    if (!token) {
      return false; // No se proporcionó un token, la solicitud no está autorizada
    }

    try {
      // Verificar y decodificar el token
      const decoded = this.jwtService.verify(token);

      // Asignar el usuario (o datos relevantes del token) a la solicitud para su uso posterior
      request.user = decoded;

      return true; // La solicitud está autorizada
    } catch (error) {
      return false; // El token es inválido, la solicitud no está autorizada
    }
  }

  private extractTokenFromHeader(authorizationHeader: string): string | null {
    if (!authorizationHeader) {
      return null;
    }

    const [bearer, token] = authorizationHeader.split(' ');

    if (bearer.toLowerCase() !== 'bearer' || !token) {
      return null;
    }

    return token;
  }
}
