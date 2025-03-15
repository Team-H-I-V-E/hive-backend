import { Comments } from "../entities/comments.entity";


export class CommentsResponseDto {

    commentsID: number;
    commentsContents: string;
    articleCreatedAt: Date;
    
    constructor(comments: Comments) {
        this.commentsID = comments.commentsID;
        this.commentsContents = comments.commentsContents;
        this.articleCreatedAt = comments.articleCreatedAt;
    }

}