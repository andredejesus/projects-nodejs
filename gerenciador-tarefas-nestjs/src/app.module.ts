import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entity/user.entity';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user/user.controller';
import { UsersModule } from './user/user.module';
import { TaskEntity } from './tasks/entity/task.entity';
import { TaskModule } from './tasks/task.module';

@Module({
  imports: [

    //Leitura de variaveis de ambiente e outras configurações
    ConfigModule.forRoot(),

    //Configuração de conexão do banco de dados postgres
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [UserEntity, TaskEntity],
      synchronize: process.env.ENV === "development"
    }),

    forwardRef(() => UsersModule),
    forwardRef(() => TaskModule)

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
