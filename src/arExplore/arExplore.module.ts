import { Module } from "@nestjs/common";
import { ArExploreController } from "./controller/arExplore.controller";
import { ArExploreService } from "./service/arExplore.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Stamp } from "./entities/stamp.entity";
import { CollectedStamp } from "../collectionStamp/entities/collectedStamp.entity";
@Module ({
    imports: [TypeOrmModule.forFeature([Stamp, CollectedStamp])],
    controllers: [ArExploreController],
    providers: [ArExploreService],
})
export class ArExploreModule {}