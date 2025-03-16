import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class CollectedStamp {
    @PrimaryGeneratedColumn()
    collectedStampID: number;

    @Column()
    stampID: number;

    @Column()
    userID: number;

    @Column()
    panoramaViewerID: number;

    @CreateDateColumn()
    stampTime: Date;
}
