import { UserEntity } from "src/user/entity/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'tasks'})
export class TaskEntity {

    @PrimaryGeneratedColumn({
        unsigned: true
    })
    id: number;

    @Column()
    description: string;

    @Column({
        nullable: true
    })
    startDate: Date;

    @Column({
        nullable: true
    })
    finalDate: Date;

    @Column()
    status: string;

    @ManyToOne(() => UserEntity, (task) => TaskEntity, {
        eager: true,
        nullable: true
    })
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;


}