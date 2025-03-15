import { Module } from "@nestjs/common";
import { CommentsService } from "./service/comments.service";
import { CommentsController } from "./controller/comments.controller";

@Module({
    imports: [CommentsService],
    controllers: [CommentsController],
    providers: []
})
export class CommentsModule {}