import { Column, Entity, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ArticleImage } from "./article-image.entity";

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    articleId: number;

    @Column()
    userId: number;

    @Column()
    articleTitle: string;

    @Column()
    articleContents: string;

    @OneToMany(() => ArticleImage, image => image.article, { cascade: true })
    articleImages: ArticleImage[];

    @CreateDateColumn({ type: 'timestamp' })
    articleCreatedAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    articleUpdatedAt: Date;
}
