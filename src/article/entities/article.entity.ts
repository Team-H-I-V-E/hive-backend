import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ArticleStatus } from "./article-status.enum";

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    author: string;

    @Column()
    title: string;

    @Column()
    contents: string;

    @Column()
    image: string;

    @Column()
    status: ArticleStatus;
}