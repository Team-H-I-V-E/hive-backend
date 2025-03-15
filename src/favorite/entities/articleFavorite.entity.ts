import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ArticleFavorite {

    @PrimaryGeneratedColumn()
    articleFavoriteID : number;

    @Column()
    articleID: number;

    @Column()
    userID: number;

}