import { Expose } from "class-transformer";
import { IsDateString, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";
import { UserGetDTO } from "src/user/dto/user-get.dto";

export class TaskCreateDTO {

    @IsString({
        message: 'Campo descrição não preenchido.',
    })
    @Expose()
    description: string;

    @IsOptional()
    @IsDateString()
    @Expose()
    startDate: string;

    @IsOptional()
    @IsDateString()
    @Expose()
    finalDate: string;

    @IsString()
    @Expose()
    status: string;

    @Expose()
    user: UserGetDTO
}