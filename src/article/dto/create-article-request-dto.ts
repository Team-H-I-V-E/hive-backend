import { IsNotEmpty } from "class-validator";

export class CreateArticleDto {
    @IsNotEmpty()
    userID: number;

    @IsNotEmpty()
    articleTitle: string;

    @IsNotEmpty()
    articleContents: string;
    
    articleImage: string;
}