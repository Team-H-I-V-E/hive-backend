import { IsNotEmpty } from "class-validator";

export class CreateArticleFavoriteDto {

    @IsNotEmpty()
    articleID: number;

    @IsNotEmpty()
    userID: number;

}