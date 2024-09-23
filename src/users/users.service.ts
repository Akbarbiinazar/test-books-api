import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async getMyUser(id: string, req: any) {
        const decodedUserInfo = req.user as { id: string; email: string };

        const foundUser = await this.prisma.user.findUnique({ where: { id } });
    
        if (!foundUser) {
          throw new NotFoundException();
        }
    
        if (foundUser.id !== decodedUserInfo.id) {
          throw new ForbiddenException();
        }
    
        delete foundUser.hashedPassword;
    
        return { user: foundUser };
    }

    async getAllUsers() {
        return await this.prisma.user.findMany({select: {id: true, email: true}})
    }

    async getUserByEmail(email: string) {
        return await this.prisma.user.findUnique({where: {email}})
    }
}
