import { Injectable } from '@nestjs/common';

@Injectable()
export class ArExperienceService {
  getStamps() {
    // 이미 획득한 스탬프를 제외한 스탬프 반환
    return [];
  }

  acquireStamp(acquireStampDto: { stampId: string }) {
    // 스탬프 획득
    return { message: 'Stamp acquired', stampId: acquireStampDto.stampId };
  }
}