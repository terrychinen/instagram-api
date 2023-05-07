import {
  Logger,
  Injectable,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities';
import { CreateUserDto } from './dtos';
import { getDateTimeByCountry } from '../../utils/services/world-time.service';

@Injectable()
export class UserService {
  private _logger = new Logger('UserService');

  constructor(
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
    private jwtService: JwtService,
    private _httpService: HttpService,
  ) {}

  async findOneById(userId: string) {
    if (!userId) throw new NotFoundException('User id is undefined or null');

    try {
      const user = await this._userRepository.findOneBy({ userId });
      if (!user) {
        throw new NotFoundException(`User with ${userId} id not found`);
      }
      return user;
    } catch (error) {
      this._handleErrors(error);
    }
  }

  async findOneByEmail(email: string) {
    try {
      const user = await this._userRepository.findOneBy({ email });
      if (!user) {
        throw new NotFoundException(`User not found`);
      }

      return user;
    } catch (error) {
      this._handleErrors(error);
    }
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const createUser = this._userRepository.create({
        ...createUserDto,
        password: bcrypt.hashSync(createUserDto.password, 10),
      });

      const currentDate = await getDateTimeByCountry(
        'America',
        'Lima',
        this._httpService,
      );

      createUser.registerDate = new Date(currentDate);
      createUser.token = this.jwtService.sign({ id: createUser.userId });
      return await this._userRepository.save(createUser);
    } catch (error) {
      console.log(error);
      this._handleErrors(error);
    }
  }

  async validate(id: string): Promise<User> {
    const user = await this.findOneById(id);
    if (!user.isActive) {
      throw new UnauthorizedException('User is inactive, send a email');
    }

    delete user.password;
    return user;
  }

  async saveToken(user: User) {
    try {
      const token = this.jwtService.sign({ id: user.userId });
      user.token = token;
      return await this._userRepository.save(user);
    } catch (error) {
      this._handleErrors(error);
    }
  }

  private _handleErrors(error: any): never {
    if (error.code === '23305') throw new BadRequestException(error.detail);
    if (error.code === '23505') {
      throw new BadRequestException('Email already exists.');
    }

    this._logger.error(error);
    throw new InternalServerErrorException('Check server logs');
  }
}
