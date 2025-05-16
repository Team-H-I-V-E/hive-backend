import { Controller, Get, Param, ParseIntPipe, Request } from '@nestjs/common';
import { CollectionStampService } from '../service/collectionStamp.service';
import { StampListItemDto } from '../dto/stamp-list.dto';
import { StampDetailDto } from '../dto/stamp-detail.dto';

@Controller('api/mystamps')
export class CollectionStampController {
    constructor(
    private readonly svc: CollectionStampService,
  ) {}

  // 전체 목록 조회
  @Get()                 
  getMyStamps(@Request() req): Promise<StampListItemDto[]> {
    const userId = req.user?.id ?? 1;
    return this.svc.getMyStamps(userId);
  }

  // 스탬프 상세 조회
  @Get(':stampId')
  getStampDetail(
    @Param('stampId', ParseIntPipe) stampId: number,
    @Request() req,
  ): Promise<StampDetailDto> {
    const userId = req.user?.id ?? 1;
    return this.svc.getStampDetail(userId, stampId);
  }
}

