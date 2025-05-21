import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CulturalAsset } from '../entities/cultural_assets.entity';

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(CulturalAsset)
    private readonly culturalAssetRepo: Repository<CulturalAsset>,
  ) {}

  findAll(): Promise<CulturalAsset[]> {
    return this.culturalAssetRepo.find();
  }
}