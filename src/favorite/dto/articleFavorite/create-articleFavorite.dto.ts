import { IsNotEmpty } from "class-validator";

export class CreateArticleFavoriteDto {

    @IsNotEmpty()
    articleId: number;

    @IsNotEmpty()
    userId: number;

}