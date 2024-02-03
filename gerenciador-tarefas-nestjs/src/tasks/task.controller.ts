import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { TaskService } from './task.service';
import { TaskCreateDTO } from "./dto/task-create.dto";
import { TaskEntity } from "./entity/task.entity";
import { plainToInstance } from 'class-transformer';
import { TaskGetAllDTO } from "./dto/task-getAll.dto";
import { TaskUpdatePatchDTO } from "./dto/task-update-patch.dto";

@Controller('tasks')
export class TaskController {

    private readonly logger = new Logger(TaskController.name);

    constructor(private readonly taskService: TaskService) {}

    @Post('create')
    async createTask(@Body() taskCreateDTO: TaskCreateDTO ) {
        const taskEntity =  plainToInstance(TaskEntity, taskCreateDTO);
        return plainToInstance(TaskCreateDTO, await this.taskService.createTask(taskEntity));
        
    }

    @Get('all')
    async listAllTasks() {

        const listTasksDTO= plainToInstance(TaskGetAllDTO, await this.taskService.listAllTasks());

        return listTasksDTO;

    }

    @Get('find/:userId')
    async listTasksByIdUser(@Param('userId', ParseIntPipe) userId: number) {

        const listTasksDTO= plainToInstance(TaskGetAllDTO, await this.taskService.listTasksByIdUser(userId));
        return listTasksDTO;
    }

    @Patch('path')
    async updatePatchTask(@Body() taskUpdatePatchDTO: TaskUpdatePatchDTO) {
        const taskEntity =  plainToInstance(TaskEntity, taskUpdatePatchDTO);

        const task = plainToInstance(TaskUpdatePatchDTO, this.taskService.updateTask(taskEntity));

        return task;

    }

    @Delete(':id')
    async deleteTaskById(@Param('id', ParseIntPipe) id: number) {
        return this.taskService.deleteTask(id);

    }

    


}