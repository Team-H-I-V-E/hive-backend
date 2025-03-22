import { IsNotEmpty } from "class-validator";

export class CommentsRequestDto {
    
    @IsNotEmpty()
    articleID: number;

}