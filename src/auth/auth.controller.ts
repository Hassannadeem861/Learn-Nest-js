import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUser } from './dto/register-user-dto';
import { AuthGuard } from './auth.guard';

@Controller('/api/v1')
export class AuthController {
  // authService : AuthService

  // constructor(authService : AuthService) {
  //  this.authService = authService
  // }

  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterUser) {
    const createUser = await this.authService.register(registerUserDto);
    return { message: 'User created successfully', createUser };
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() registerUserDto: RegisterUser) {
    const loginUser = await this.authService.login(registerUserDto);
    return { message: 'User login successfully', success: true, loginUser };
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const userId = req.user.id;
    console.log(userId);
    
    const user = await this.authService.getUserById(userId);
    console.log(user);
    
    return user;
  }
}
