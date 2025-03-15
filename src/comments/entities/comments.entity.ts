import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comments {
    @PrimaryGeneratedColumn()
    commentsID: number;

    @Column()
    articleID: number;

    @Column()
    userID: number;

    @Column()
    commentsContents: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })
    articleCreatedAt: Date;

}