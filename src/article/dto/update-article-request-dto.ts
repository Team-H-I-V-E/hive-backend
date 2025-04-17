import { IsOptional, IsString, IsArray } from "class-validator";

export class UpdateArticleDto {
    @IsOptional()
    @IsString()
    articleTitle?: string;

    @IsOptional()
    @IsString()
    articleContents?: string;

    @IsOptional()
    @IsArray()
    articleImages?: string[];
}