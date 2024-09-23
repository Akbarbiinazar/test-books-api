import {  Module } from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';


import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '24h' },
        };
      },
      inject: [ConfigService],
    }),
  ], 
  controllers: [ AuthController],
  exports: [AuthService, JwtModule],
  providers: [ AuthService],
})
export class AuthModule {}
