import { IsNotEmpty } from "class-validator";

export class CreateCommentDto {
    
    @IsNotEmpty()
    articleID: number;

    @IsNotEmpty()
    userID: number;

    @IsNotEmpty()
    commentsContents: string;

}