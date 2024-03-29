import { PartialType } from "@nestjs/mapped-types";
import { TaskCreateDTO } from "./task-create.dto";


export class TaskUpdatePatchDTO extends PartialType(TaskCreateDTO) {}