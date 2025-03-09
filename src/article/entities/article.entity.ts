import { Column, PrimaryGeneratedColumn } from "typeorm";
import { ArticleStatus } from "./article-status.enum";

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
    image: Buffer;

    @Column()
    status: ArticleStatus;
}