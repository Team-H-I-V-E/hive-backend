import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CollectedStamp } from '../entities/collectedStamp.entity';
import { Stamp } from 'src/arExplore/entities/stamp.entity';
import { StampListItemDto } from '../dto/stamp-list.dto';
import { StampDetailDto } from '../dto/stamp-detail.dto';

@Injectable()
export class CollectionStampService {
  constructor(
    @InjectRepository(CollectedStamp)
    private readonly collectedRepo: Repository<CollectedStamp>,
    @InjectRepository(Stamp)
    private readonly stampRepo: Repository<Stamp>,
  ) {}

  // 전체 스탬프 + 획득여부 반환
  async getMyStamps(userId: number): Promise<StampListItemDto[]> {
    const [all, collected] = await Promise.all([
      this.stampRepo.find(),
      this.collectedRepo.find({ where: { userID: userId } }),
    ]);
    const got = new Set(collected.map(c => c.stampID));

    return all.map(s => ({
      stampID:   s.stampID,
      stampName: s.stampName,
      acquired:  got.has(s.stampID),
      stampImage: got.has(s.stampID)
    ? `http://localhost:3000${s.stampImage}`
    : null,
    }));
  }

  // 스탬프 상세 반환
  async getStampDetail(userId: number, stampId: number): Promise<StampDetailDto> {
    const stamp = await this.stampRepo.findOne({ where: { stampID: stampId } });
    if (!stamp) throw new NotFoundException('Stamp not found');

    const collected = await this.collectedRepo.findOne({
      where: { userID: userId, stampID: stampId },
    });

    return {
      stampName:     stamp.stampName,
      stampPeriod:   stamp.stampPeriod,
      stampLocation: stamp.stampLocation,
      stampTime:     collected?.stampTime ?? null,
    };
  }
}
