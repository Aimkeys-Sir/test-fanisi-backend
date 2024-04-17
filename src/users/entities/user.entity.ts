import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({name:"users"})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({unique:true})
    email: string;

    @Column()
    phoneNumber: string;

    @Column()
    isAdmin: boolean;

    @Column()
    @Exclude()
    password?: string;

    @CreateDateColumn()
    @Exclude()
    createdAt: Date;
}