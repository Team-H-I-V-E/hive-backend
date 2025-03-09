import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ArticleStatus } from "./article-status.enum";

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    articleID: number;

    @Column()
    userID: number;

    @Column()
    articleTitle: string;

    @Column()
    articleContents: string;

    @Column()
    articleImage: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })
    articleCreatedAt: Date;

}