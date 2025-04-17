import { IsNotEmpty, IsArray, IsOptional } from "class-validator";

export class CreateArticleDto {
    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    articleTitle: string;

    @IsNotEmpty()
    articleContents: string;

    @IsOptional()
    @IsArray()
    articleImages?: string[];
}