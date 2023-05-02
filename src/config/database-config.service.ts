import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
  constructor(private _configService: ConfigService) {}

  private _getValue(key: string) {
    const value = this._configService.get(key);
    if (!value) throw new Error(`Config error: missing env.key`);
    return value;
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this._getValue('DB_TYPE'),
      host: this._getValue('DB_HOST'),
      port: +this._getValue('DB_PORT'),
      username: this._getValue('DB_USERNAME'),
      password: this._getValue('DB_PASSWORD'),
      database: this._getValue('DB_NAME'),
      autoLoadEntities: this._getValue('DB_AUTOLOADENTITIES'),
      synchronize: this._getValue('DB_SYNCHRONIZE'),
    };
  }
}
