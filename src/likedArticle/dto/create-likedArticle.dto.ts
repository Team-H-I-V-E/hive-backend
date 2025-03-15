import { IsNotEmpty } from "class-validator";

export class CreateLikedArticleDto {

    @IsNotEmpty()
    articleID: number;

    @IsNotEmpty()
    userID: number;

}