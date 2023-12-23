import { IsString } from 'class-validator';
/* eslint-disable prettier/prettier */
import { IsEmail, MinLength } from "class-validator";

export class AuthLoginDTO {
    
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;
}