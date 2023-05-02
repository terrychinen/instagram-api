import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NotFoundMiddleware } from './utils/middlewares/not-found.middleware';
import { DbGraphqlConfigModule } from './config/db-graphql-config.module';

@Module({
  imports: [ConfigModule.forRoot(), DbGraphqlConfigModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(NotFoundMiddleware).forRoutes();
  }
}
