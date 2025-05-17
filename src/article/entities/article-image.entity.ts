import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Article } from "./article.entity";

@Entity()
export class ArticleImage {
    @PrimaryGeneratedColumn()
    articleImageId: number;

    @Column()
    articleImage: string;

    @ManyToOne(() => Article, article => article.articleImages, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'articleId' }) // 외래키 컬럼명 명시
    article: Article;
}
