import { ForbiddenException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'

import { PrismaService } from 'prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import {jwtSecret} from '../utils/constants'


@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService) {}

    async register(dto: AuthDto) {
        const {email, password} = dto
        
        const foundUser = await this.prisma.user.findUnique({where: {email}})

        if (foundUser) {
            throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST)
        }

        const hashedPassword = await this.hashPassword(password)

        await this.prisma.user.create({
            data: {
                email,
                hashedPassword
            }
        })

        return  {message: 'signup was successfull'}
    }

    async login(dto: AuthDto, req: Request, res: Response) {
        const foundUser = await this.validateUser(dto)

        const token = await this.signToken({id: foundUser.id, email: foundUser.email})

        if (!token) {
            throw new ForbiddenException()
        }

        res.cookie('jwt', token, {
            httpOnly: true, 
            secure: true, 
            maxAge: 3600000, 
        });

       return res.send({message: 'Logged in successfully', token})
    }

    async logout(req: Request, res: Response) {
        res.clearCookie('token')
        return res.send({message: 'Logout successfully'})
    }

    async hashPassword(password: string) {
        const saltOrRounds = 10
        
        return await bcrypt.hash(password, saltOrRounds)
    }

    async comparePasswords(args: {password: string, hash: string}) {
        return await bcrypt.compare(args.password, args.hash)
    }

    async signToken(args: {id: string, email: string}) {
        const payload = args 

        return this.jwt.signAsync(payload, {secret: jwtSecret})
    }

    async validateToken(token: string) {
        return this.jwt.verify(token, {
            secret : process.env.JWT_SECRET_KEY
        });
    }

    private async validateUser(dto: AuthDto) {
        const {email, password} = dto
        const foundUser = await this.prisma.user.findUnique({where: {email}})

        const isMatch = await this.comparePasswords({password, hash: foundUser.hashedPassword})

        if (foundUser && isMatch) {
            return foundUser
        }
        throw new UnauthorizedException({message: 'Wrong credentials'})
    }
}
