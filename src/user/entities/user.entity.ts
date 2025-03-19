import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserStatus } from "./user-role.enum";

@Entity ()
export class User {
    
    @PrimaryGeneratedColumn()
    userId: number;

    @Column()
    userName: string;

    @Column()
    userPassword: string;

    @Column()
    nickname: string;

    @Column({ unique: true })
    userEmail: string;
    
    @CreateDateColumn()
    userCreatedAt: Date;

    @UpdateDateColumn()
    userUpdatedAt: Date;
}