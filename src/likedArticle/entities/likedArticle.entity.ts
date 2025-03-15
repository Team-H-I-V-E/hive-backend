import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class LikedArticle {

    @PrimaryGeneratedColumn()
    likedArticleID: number;

    @Column()
    articleID: number;

    @Column()
    userID: number;

}