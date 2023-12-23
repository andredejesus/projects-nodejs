/* eslint-disable prettier/prettier */
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { PrismaService } from './../prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) {}

    async create(user: CreateUserDTO) {

        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt);

        return await this.prisma.user.create({
            data: user
        })
    }

    async list() {
        return await this.prisma.user.findMany();
    }

    async show(id: number) {

        await this.exists(id);

        return await this.prisma.user.findUnique({
            where: {
                id
            }
        })
    }

    async update(id: number, {email, name, password, birthAt, role}: UpdatePutUserDTO) {

        await this.exists(id);

        const salt = await bcrypt.genSalt();
        password = await bcrypt.hash(password, salt);

        console.log(password)

        return await this.prisma.user.update({
            data: {email, name, password, birthAt: birthAt ? new Date(birthAt) : null, role},
            where: {
                id
            }
        })
    }

    async updatePartial(id: number, {email, name, password, birthAt, role}: UpdatePatchUserDTO) {
        
        const data: any = {};

        if (birthAt) {
            data.birthAt = new Date(birthAt);
        }

        if (email) {
            data.email = email;
        }

        if (name) {
            data.name = name;
        }

        if (password) {
            const salt = await bcrypt.genSalt();
            data.password = await bcrypt.hash(password, salt);
        }

        if (role) {
            data.role = role;
        }

        return await this.prisma.user.update({
            data,
            where: {
                id
            }
        })
    }

    async delete(id: number) {

        await this.exists(id);

        return this.prisma.user.delete({
            where: {
                id
            }
        })
    }

    async exists(id: number) {
        if (!(await this.prisma.user.count({
            where: {
                id
            }
        }))) {
            throw new NotFoundException(`O usuário ${id} não existe.`)
        }
    }

}