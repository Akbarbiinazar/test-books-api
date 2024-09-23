import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from 'prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    AuthModule, PrismaModule, UsersModule, BooksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
