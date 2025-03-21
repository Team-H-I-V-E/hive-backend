import { Controller, Get, Post, Param } from "@nestjs/common";
import { ArExperienceService } from "../service/arExperience.service";
import { AcquireStampDto } from "../dto/arExperience-request.dto";

@Controller('api/arexperience')
export class ArExperienceController {
  constructor(private readonly arExperienceService: ArExperienceService) {}

  // 사용자가 획득한 스탬프 목록 조회
  @Get(':userId/stamps')
  getStamps(@Param('userId') userId: number) {
    return this.arExperienceService.getStamps(userId);
  }

  // 사용자가 새로운 스탬프를 획득
  @Post(':userId/:stampId')
  acquireStamp(@Param() acquireStampDto: AcquireStampDto) {
    return this.arExperienceService.acquireStamp(acquireStampDto);
  }
}