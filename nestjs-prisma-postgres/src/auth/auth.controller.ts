/* eslint-disable prettier/prettier */

import { UserService } from './../user/user.service';
import { Post, UseGuards, BadRequestException, Body, Controller, ParseFilePipe, FileTypeValidator, MaxFileSizeValidator } from '@nestjs/common';;
import { AuthForgetDTO } from './dto/auth-forget.dto';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { AuthResetDTO } from './dto/auth-reset.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/decorators/user.decorator';
import { UploadedFile, UseInterceptors } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { FileService } from 'src/file/file.service';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly useService: UserService,
        private readonly authService: AuthService,
        private readonly fileService: FileService
    ) {}

    @Post('login')
    async login(@Body() {email, password}: AuthLoginDTO) {
        return this.authService.login(email, password)
    }

    @Post('register')
    async register(@Body() body: AuthRegisterDTO ) {
        return this.authService.register(body);
    }

    @Post('forget')
    async forget(@Body() {email}: AuthForgetDTO) {
        return this.authService.forget(email);
    }

    @Post('reset')
    async reset(@Body() {password, token}: AuthResetDTO) {
        return this.authService.reset(password, token);
    }

    @UseGuards(AuthGuard)
    @Post('me')
    async me(@User('id') user) {
        return {user}
    }

    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(AuthGuard)
    @Post('photo')
    async uploadPhoto(
        @User() user, 
        @UploadedFile(new ParseFilePipe({
            validators: [
                new FileTypeValidator({fileType: /(jpeg)$/,}),
                new MaxFileSizeValidator({maxSize: 2024 * 50})
            ]
        })) 
        photo: Express.Multer.File) {

        const path = join(__dirname, '../', '../', 'storage', 'photos', `photo-${user.id}.jpg`);
        
        try {
            await this.fileService.upload(photo, path);
        } catch (e) {
            throw new BadRequestException(e)
        }
        

        return {sucess: true}
    }

}