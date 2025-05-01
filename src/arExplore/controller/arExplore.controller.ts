import { Controller, Get, Post, Param, Body, Logger } from '@nestjs/common';
import { ArExploreService } from '../service/arExplore.service';
import { AcquireStampDto } from '../dto/acquire-stamp.dto';

@Controller('api/arexplore')
export class ArExploreController {
  private readonly logger = new Logger(ArExploreController.name);

  constructor(private readonly arExploreService: ArExploreService) {}

  // 사용자가 획득한 스탬프 목록 조회
  @Get(':userId/stamps')
  async getStamps(@Param('userId') userId: number) {
    this.logger.log(`📥 [GET] /${userId}/stamps 호출됨`);
    const stamps = await this.arExploreService.getStamps(userId);
    this.logger.log(`📦 획득한 스탬프 수: ${stamps.length}`);
    return stamps;
  }

  // 사용자가 획득하지 않은 스탬프 리스트를 조회
  @Get(':userId/unacquired-stamps')
  async getUnacquiredStamps(@Param('userId') userId: number) {
    this.logger.log(`📥 [GET] /${userId}/unacquired-stamps 호출됨`);
    const stamps = await this.arExploreService.getUnacquiredStamps(userId);
    this.logger.log(`📦 미획득 스탬프 수: ${stamps.length}`);
    stamps.forEach((s) =>
      this.logger.log(
        `🔸 ID: ${s.stampID}, 위도: ${s.stampLatitude}, 경도: ${s.stampLongitude}, 이름: ${s.stampName}`,
      ),
    );
    return stamps;
  }

  // 사용자가 새로운 스탬프를 획득
  @Post(':userId/:stampId')
  async acquireStamp(
    @Param('userId') userId: number,
    @Param('stampId') stampId: number,
    @Body() body: { userLatitude: number; userLongitude: number },
  ) {
    this.logger.log(
      `📬 [POST] /${userId}/${stampId} 호출됨 - 위치: (${body.userLatitude}, ${body.userLongitude})`,
    );

    const acquireStampDto: AcquireStampDto = {
      userID: userId,
      stampID: stampId,
      userLatitude: body.userLatitude,
      userLongitude: body.userLongitude,
    };

    const result = await this.arExploreService.acquireStamp(acquireStampDto);
    this.logger.log(`✅ 스탬프 획득 처리 결과: ${JSON.stringify(result)}`);
    return result;
  }
}