import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { jwtSecret } from 'src/utils/constants';


@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,  
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(req);

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      // const authHeader = req.headers.get('Authorization') 
      // const bearer = authHeader.split(' ')[0]
      // const token = authHeader.split(' ')[1]

      // if (bearer !== 'Bearer' || !token) {
      //   throw new UnauthorizedException({message: 'User is not authorized'})
      // }
      
      // const user = this.jwtService.verifyAsync(token)
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtSecret,
      });
      req['user'] = payload;

      return true
    } catch (e) {
      throw new UnauthorizedException({message: 'User is not authorized'})
    }
  
  }

  private extractTokenFromHeader(request: Request): string | null {
    const authHeader = request.headers['authorization'] || request.headers['Authorization'];
    if (authHeader && typeof authHeader === 'string') {
      const [type, token] = authHeader.split(' ');
      return type === 'Bearer' ? token : null;
    }
    return null;

  }
}
