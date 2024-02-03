import { IsDateString, IsEmail, IsEnum, IsOptional, IsString, IsStrongPassword } from "class-validator";
import { UserRole } from "../enum/user.role";
import { Expose } from "class-transformer";

export class UserCreateDTO {

    @Expose()
    @IsString()
    name: string;

    @Expose()
    @IsEmail()
    email: string;

    @Expose()
    @IsStrongPassword({
        minLength: 6,
        minNumbers: 0,
        minLowercase: 0,
        minUppercase: 0,
        minSymbols: 0
    })
    password: string;
    

    @Expose()
    @IsOptional()
    @IsDateString()
    birthAt: string;

    @Expose()
    @IsOptional()
    @IsEnum(UserRole)
    role: UserRole;

}