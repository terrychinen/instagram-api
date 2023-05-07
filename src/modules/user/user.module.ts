import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { User } from './entities';
import { JwtStrategyService } from '../../utils/strategies';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
      }),
    }),
  ],
  providers: [UserResolver, UserService, JwtStrategyService],
  exports: [UserService, JwtModule, JwtStrategyService],
})
export class UserModule {}
