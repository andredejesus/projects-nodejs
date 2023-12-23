/* eslint-disable prettier/prettier */

import { LogInterceptor } from './../interceptors/log.interceptor';
import { UserService } from './user.service';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { CreateUserDTO } from './dto/create-user.dto';

import { Body, Controller, Post, Get, Param, Put, Patch, Delete, UseInterceptors, UseGuards } from "@nestjs/common";
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { ParamId } from 'src/decorators/param-id.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthGuard } from 'src/guards/auth.guard';

@Roles(Role.Admin)
@UseGuards(AuthGuard, RoleGuard) // Todas as rotas terão esse guard
@UseInterceptors(LogInterceptor)//Intercepta os dados de requisições de todos os endpoints desse controller
@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) {

    }

    //@Roles(Role.Admin,  Role.User)
    @Post()
    async create(@Body() user:CreateUserDTO) {
        return await this.userService.create(user)
    }

    @Get()
    async list() {
        return await this.userService.list();
    }

    @Get(':id')
    async show(@ParamId() id: number) {
        return await this.userService.show(id);
    }

    @Put(':id')
    async update(@Body() user:UpdatePutUserDTO, @Param('id', ParseIntPipe) id) {
        return this.userService.update(id, user);
    }

    @Patch(':id')
    async updatePartial(@Body() userPartial:UpdatePatchUserDTO, @Param('id', ParseIntPipe) id) {
        return this.userService.updatePartial(id, userPartial);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id) {
        return this.userService.delete(id);
    }


}