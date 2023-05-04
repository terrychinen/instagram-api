import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserResolver, UserService],
})
export class UserModule {}
