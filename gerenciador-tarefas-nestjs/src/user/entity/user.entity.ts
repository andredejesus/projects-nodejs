import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserRole } from "../enum/user.role";
import { Transform } from "@nestjs/class-transformer";
import { UserCreateDTO } from "../dto/user-create.dto";
import { TaskEntity } from "src/tasks/entity/task.entity";

@Entity({name: 'users'})
export class UserEntity {

    @PrimaryGeneratedColumn({
        unsigned: true
    })
    id: number;

    @Column({
        nullable: true   
    })
    name: string;

    @Column({
        unique: true,
        nullable: true
    })
    email: string;

    @Column({
        nullable: true
    })
    password: string;

    @Column({
        nullable: true
    })
    birthAt: string;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.VIEWER
    })
    role: UserRole;


    @OneToMany(() => TaskEntity, task => task.user, {nullable: true })
    tasks: TaskEntity[];

    @Transform(() => UserCreateDTO)
    toDTO(): UserCreateDTO {
        return {
            name: this.name,
            email: this.email,
            password: this.password,
            birthAt: this.birthAt,
            role: this.role
        };
    }

}