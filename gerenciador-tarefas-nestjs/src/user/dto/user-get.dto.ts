import { Exclude, Expose } from "class-transformer";
import { UserCreateDTO } from "./user-create.dto";

export class UserGetDTO extends UserCreateDTO {

    @Expose()
    id: number;

    @Exclude()
    password: string;

}