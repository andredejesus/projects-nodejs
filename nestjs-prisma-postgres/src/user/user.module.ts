/* eslint-disable prettier/prettier */

import { AuthModule } from './../auth/auth.module';
import { PrismaModule } from './../prisma/prisma.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { forwardRef, Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule, forwardRef(() => AuthModule)], // Esse forwardRef resolve o problema de dependência circular 
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}