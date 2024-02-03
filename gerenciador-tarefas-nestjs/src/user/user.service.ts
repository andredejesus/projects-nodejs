import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { Repository } from "typeorm";
import { UserEntity } from "./entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDuplicateEntryException } from "./exceptions/UserDuplicateEntryException";
import { UserNotFoundException } from "./exceptions/UserNotFoundException";


@Injectable()
export class UserService {

    private readonly logger = new Logger(UserService.name);

    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) {}

    async createUser(user: UserEntity) {

        this.logger.log('Starting to create a user.');
        
        if (await this.userRepository.exist({
            where: {
                email: user.email
            }
        })) {
            throw new UserDuplicateEntryException(user.email);
        }

        try {
            return await this.userRepository.save(user);
        } catch (error) {
            this.logger.error('Error occurred to create user.', error);
            throw new InternalServerErrorException('Error occurred to create user.');
        }

    }

    async listAllUsers() {
        return await this.userRepository.find();
    }

    async existUserById(id: number) {

        this.logger.log('Checking if user does not exist.');

        if (!await this.userRepository.exist({
            where: {
                id
            }
        })) {
            throw new UserNotFoundException(`User id: ${id} not found.`);
        }

    }

    async getUserById(id: number) {

        this.logger.log('Searching user by id.');

        return await this.userRepository.findOne({
            where: {
                id
            }
        })
    }

}