import { Controller, Get, Post, Param, Body } from "@nestjs/common";
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

  // 사용자가 획득하지 않은 스탬프 리스트를 조회
  @Get(':userId/unacquired-stamps')
  getUnacquiredStamps(@Param('userId') userId: number) {
    return this.arExperienceService.getUnacquiredStamps(userId);
  }

  // 사용자가 새로운 스탬프를 획득
  @Post(':userId/:stampId')
  async acquireStamp(
    @Param('userId') userId: number,
    @Param('stampId') stampId: number,
    @Body() body: { userLatitude: number; userLongitude: number }
  ) {
    const acquireStampDto: AcquireStampDto = {
      userID: userId,
      stampID: stampId,
      userLatitude: body.userLatitude,
      userLongitude: body.userLongitude,
    };
    
    return this.arExperienceService.acquireStamp(acquireStampDto);
  }
}