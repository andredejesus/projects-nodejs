/* eslint-disable prettier/prettier */
import { AuthModule } from './auth/auth.module';
import { UserIdCheckMiddleware } from './middlewares/user-id-check.middlewares';
import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
    forwardRef(() => UserModule), 
    forwardRef(() =>AuthModule),// Esse forwardRef resolve o problema de dependência circular 
    MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'caleigh.grant@ethereal.email',
            pass: 'pwxpvD9hyZyVx8mGJD'
        }
      },
      defaults: {
        from: '"Curso Hcode" <raphael.kihn@ethereal.email>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    
  ], 
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }],
})
export class AppModule implements NestModule {

  //Habilita o Middleware que foi criado em todas as rotas de usuários que seja passado o ID
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserIdCheckMiddleware).forRoutes({
      path: 'users/:id',
      method: RequestMethod.ALL
    })
  }

}
