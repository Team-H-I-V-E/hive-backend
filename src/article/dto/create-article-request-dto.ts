import { IsNotEmpty } from "class-validator";

export class CreateArticleDto {
    @IsNotEmpty()
    author: string;

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    contents: string;
    image: string;
}