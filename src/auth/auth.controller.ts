import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: AuthDto, description: 'User registration data' })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  register(@Body() dto: AuthDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiBody({ type: AuthDto, description: 'User login credentials' })
  @ApiResponse({ status: 200, description: 'User successfully logged in' })
  @ApiResponse({ status: 400, description: 'Invalid credentials' })
  login(@Body() dto: AuthDto, @Req() req, @Res() res) {
    return this.authService.login(dto, req, res);
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout a user' })
  @ApiResponse({ status: 200, description: 'User successfully logged out' })
  logout(@Req() req, @Res() res) {
    return this.authService.logout(req, res);
  }
}
