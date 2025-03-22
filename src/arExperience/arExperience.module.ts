import { Module } from "@nestjs/common";
import { ArExperienceController } from "./controller/arExperience.controller";
import { ArExperienceService } from "./service/arExperience.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Stamp } from "./entities/stamp.entity";
import { CollectedStamp } from "./entities/collectedStamp.entity";
@Module ({
    imports: [TypeOrmModule.forFeature([Stamp, CollectedStamp])],
    controllers: [ArExperienceController],
    providers: [ArExperienceService],
})
export class ArExperienceModule {}