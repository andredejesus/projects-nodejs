import { Expose } from "class-transformer";
import { TaskCreateDTO } from "./task-create.dto";

export class TaskGetAllDTO extends TaskCreateDTO {

    @Expose()
    id: number;
}