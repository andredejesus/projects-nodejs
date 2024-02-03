import { Body, Controller, Get, Logger, Param, ParseIntPipe, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserCreateDTO } from "./dto/user-create.dto";
import { UserEntity } from "./entity/user.entity";
import { Expose, plainToClass, plainToInstance } from 'class-transformer';
import { UserGetDTO } from "./dto/user-get.dto";

@Controller('users')
export class UserController {

    private readonly logger = new Logger(UserController.name);

    constructor(private readonly userServive: UserService) {}

    @Post()
    async createUser(@Body() userCreateDTO: UserCreateDTO): Promise<UserCreateDTO> {

        this.logger.log('Iniciando a criação de um usuário.');

        const userEntity = plainToInstance(UserEntity, userCreateDTO);

        return await this.userServive.createUser(userEntity);
    }

    @Get('all')
    async getAllUsers(): Promise<UserGetDTO[]> {

        this.logger.log('Buscando todos os usuários.');

        const  usersEntity = await this.userServive.listAllUsers();

        return this.convertEntitiesToDtos(usersEntity)

    }

    @Get(':id')
    async getUserById(@Param('id', ParseIntPipe) id: number): Promise<UserGetDTO> {

        this.logger.log('Iniciando a busca do usuário por id');

        const userEntity = await this.userServive.getUserById(id);

        return plainToClass(UserGetDTO, userEntity);
    }

    convertEntitiesToDtos(entities: UserEntity[]): UserGetDTO[] {
        return entities.map(entity => plainToClass(UserGetDTO, entity, { excludeExtraneousValues: false }));
    }

}