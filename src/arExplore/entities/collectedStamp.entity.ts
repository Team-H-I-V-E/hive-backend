import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class CollectedStamp {
    @PrimaryGeneratedColumn()
    collectedStampID: number;

    @Column()
    stampID: number;

    @Column()
    userID: number;

    @CreateDateColumn()
    stampTime: Date;
}
