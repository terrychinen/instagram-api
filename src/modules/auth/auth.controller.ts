import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dtos';
import { SignInDto } from './dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto) {
    return this._authService.signIn(signInDto);
  }

  @Post('sign-up')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this._authService.signUp(createUserDto);
  }
}
