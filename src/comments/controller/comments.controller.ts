import { Controller } from "@nestjs/common";
import { CommentService } from "../service/comments.service";

@Controller('api/comment')
export class ArticlesController {
    constructor(private commentService: CommentService){}
}