/* eslint-disable prettier/prettier */
import { PrismaModule } from './../prisma/prisma.module';
import { UserModule } from './../user/user.module';
import { AuthController } from './auth.controller';
import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from './auth.service';
import { FileModule } from 'src/file/file.module';

@Module({
    imports: [
        JwtModule.register({
        secret: process.env.JWT_SECRET
    }), forwardRef(() => UserModule), // Esse forwardRef resolve o problema de dependência circular 
        PrismaModule,
        FileModule
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule {

}