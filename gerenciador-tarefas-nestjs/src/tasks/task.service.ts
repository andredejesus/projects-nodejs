import { BadRequestException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { TaskEntity } from "./entity/task.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/user/entity/user.entity";
import { UserNotFoundException } from "src/user/exceptions/UserNotFoundException";
import { TaskUpdatePatchDTO } from "./dto/task-update-patch.dto";


@Injectable()
export class TaskService {

    private readonly logger = new Logger(TaskService.name);

    constructor(
        @InjectRepository(TaskEntity)
        private taskRepository: Repository<TaskEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) {}

    async createTask(task: TaskEntity): Promise<TaskEntity> {

        this.logger.log('Starting created of a task.')

        if (!this.isObjectEmpty(task.user)) {

            const userEntity = await this.userRepository.findOne({
                where: {
                    id: task.user.id
                }
            });

            if(!userEntity) {
                throw new UserNotFoundException(`User id: ${task.user.id} not found.`);
            }

            task.user = userEntity;
        } else {
            task.user = null; 
        }

        try {
            task.startDate = new Date;
            const taskSaved = await this.taskRepository.save(task);

            this.logger.log('Task saved successfully.')

            return taskSaved;

        } catch (error) {
            this.logger.error(error)
            throw new BadRequestException(`An error occurred while trying to save task.`)
        }

    }

    async listAllTasks(): Promise<TaskEntity[]> {

        this.logger.log('Searching all tasks.');

        const tasks = await this.taskRepository.find();

        this.logger.log(`Total tasks found: ${tasks.length}`);

        return tasks;

    }

    async listTasksByIdUser(userId: number): Promise<TaskEntity[]> {

        this.logger.log('Searching all tasks by id user.');

        const tasks = await this.taskRepository.find({
            where: {
                user: {
                    id: userId
                }
            }
        });

        return tasks;

    }

    async updateTask(task: TaskEntity): Promise<TaskEntity> {
        
        const taskEntity = await this.taskRepository.findOne({
            where: {
                id: task.id
            }
        })

        if(!taskEntity) {
            throw new NotFoundException(`task of id: ${task.id} not found.`);
        }

        try {
            return await this.taskRepository.save(task);
        } catch (error) {
           throw new BadRequestException(`There was a problem in actualized the task of id: ${task.id}`, error) 
        }

        
    }

    async deleteTask(idTask: number): Promise<void> {
        
        this.logger.log(`starting deletion of task id: ${idTask} `);

        if(!this.taskRepository.exist({
            where: {
                id: idTask
            }
        })) {
            throw new NotFoundException(`task of id: ${idTask} not found.`);
        }

        try {

            this.taskRepository.delete({
                id: idTask
            })

            this.logger.log(`Task deleted successfully.`)

        } catch (error) {
            this.logger.log(`There was a problem in deleting task of id: ${idTask}`);
            throw new BadRequestException(`There was a problem in deleting task of id: ${idTask}`, error)
        }

        

    }

    isObjectEmpty(obj: Record<string, any>): boolean {
        return Object.keys(obj).length === 0;
    }




}