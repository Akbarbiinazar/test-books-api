import { Controller, Get, Param, Req, UseGuards,  } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  getMyUser(@Param() params: {id: string}, @Req() req) {
    return this.usersService.getMyUser(params.id, req)
  }

  @Get()
  getUsers() {
    return this.usersService.getAllUsers()
  }
}
