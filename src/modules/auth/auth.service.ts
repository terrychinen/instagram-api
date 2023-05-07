import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dtos';
import { SignInDto } from './dtos/sign-in.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly _userSerivce: UserService) {}

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const userToUpdate = await this._userSerivce.findOneByEmail(email);

    if (!bcrypt.compareSync(password, userToUpdate.password)) {
      throw new NotFoundException(`User not found`);
    }

    const user = await this._userSerivce.saveToken(userToUpdate);

    delete user.password;
    return user;
  }

  async signUp(createUserDto: CreateUserDto) {
    const user = await this._userSerivce.create(createUserDto);
    return user;
  }
}
