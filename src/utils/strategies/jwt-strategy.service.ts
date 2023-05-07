import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/modules/user/entities';
import { IJwtPayload } from './interfaces';
import { UserService } from '../../modules/user/user.service';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
  constructor(
    private _configService: ConfigService,
    private _userService: UserService,
  ) {
    super({
      secretOrKey: _configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: IJwtPayload): Promise<User> {
    const { id } = payload;
    const user = await this._userService.validate(id);
    return user;
  }
}
