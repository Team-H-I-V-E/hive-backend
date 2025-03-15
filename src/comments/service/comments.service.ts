import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Comments } from "../entities/comments.entity";
import { Repository } from "typeorm";
import { CreateCommentDto } from "../dto/create-comment.dto";

@Injectable()
export class CommentsService {
    
    constructor(
        @InjectRepository(Comments)
        private CommentsRepository : Repository<Comments>
    ){}

    async getAllBComments(): Promise<Comments[]> {
        const foundComments = await this.CommentsRepository.find();
        return foundComments;
    }

    async createBComment(createCommentDto: CreateCommentDto): Promise<Comments> {
        const { articleID, userID, commentsContents } = createCommentDto;
        if (!articleID || !userID || !commentsContents) {
            throw new BadRequestException('articleID, userID, and commentsContents must be provided');
        }
        const newComment: Comments = {
            commentsID: 0, // 임시 초기화
            articleID, // author: createBoardDto.author
            userID,
            commentsContents,
            articleCreatedAt: new Date
        };
        const createdBoard = await this.CommentsRepository.save(newComment);
        return createdBoard;
    }

    async getCommentDetailById(id: number): Promise<Comments> {
        const foundComment = await this.CommentsRepository.findOneBy({ commentsID: id });
        if(!foundComment) {
            throw new NotFoundException(`Board with ID ${id} not found`);
        }
        return foundComment;
    }

    // 게시글 삭제 기능
    async deleteCommentById(id: number): Promise<void> {
        const foundComment = await this.getCommentDetailById(id);
        await this.CommentsRepository.delete(foundComment);
    }

}