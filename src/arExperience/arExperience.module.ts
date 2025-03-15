import { Module } from "@nestjs/common";
import { ArExperienceController } from "./controller/arExperience.controller";
import { ArExperienceService } from "./service/arExperience.service";

@Module ({
    controllers: [ArExperienceController],
    providers: [ArExperienceService],
})
export class ArExperienceModule {}