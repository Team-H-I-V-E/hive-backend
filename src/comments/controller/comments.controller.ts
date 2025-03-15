import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CommentsService } from "../service/comments.service";
import { Comments } from "../entities/comments.entity";
import { CommentsResponseDto } from "../dto/comments-response.dto";
import { CreateCommentDto } from "../dto/create-comment.dto";

@Controller('api/comment')
export class CommentsController {
    constructor(private commentsService: CommentsService){}

    @Get('/')
    async getAllComments(): Promise<CommentsResponseDto[]> {
	    const comments: Comments[] = await this.commentsService.getAllBComments();
        const commentsResponseDto = comments.map(comment => new CommentsResponseDto(comment));
        return commentsResponseDto;
    }

    @Post('/')
    async createBoard(@Body() createCommentDto: CreateCommentDto): Promise<CommentsResponseDto> {
        const commentsResponseDto = new CommentsResponseDto(await this.commentsService.createBComment(createCommentDto))
        return commentsResponseDto;
    }

    @Delete('/:id')
    async deleteBoardById(@Param('id') id: number): Promise<void> {
        await this.commentsService.deleteCommentById(id);
    }

}