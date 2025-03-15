import { Module } from "@nestjs/common";
import { CommentsService } from "./service/comments.service";
import { CommentsController } from "./controller/comments.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Comments } from "./entities/comments.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Comments])],
    controllers: [CommentsController],
    providers: [CommentsService]
})
export class CommentsModule {}