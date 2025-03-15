import { Controller, Get, Post, Body } from "@nestjs/common";
import { ArExperienceService } from "../service/arExperience.service";

@Controller('api/arexperience')
export class ArExperienceController {
  constructor(private readonly arExperienceService: ArExperienceService) {}

  @Get()
  getStamps() {
    return this.arExperienceService.getStamps();
  }

  @Post()
  acquireStamp(@Body() acquireStampDto: { stampId: string }) {
    return this.arExperienceService.acquireStamp(acquireStampDto);
  }
}