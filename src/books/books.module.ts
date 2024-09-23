import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [BooksController],
  providers: [BooksService, PrismaService],
  exports: [BooksService]
})
export class BooksModule {}
