import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ArticleFavorite {

    @PrimaryGeneratedColumn()
    articleFavoriteId : number;

    @Column()
    articleId: number;

    @Column()
    userId: number;

}