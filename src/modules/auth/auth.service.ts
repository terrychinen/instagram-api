import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dtos';

@Injectable()
export class AuthService {
  constructor(private readonly _userSerivce: UserService) {}

  async signUp(createUserDto: CreateUserDto) {
    const user = await this._userSerivce.create(createUserDto);
    return user;
  }
}
