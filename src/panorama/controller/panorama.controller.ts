import { Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { PanoramaService } from '../service/panorama.service';
import { Panorama } from '../entities/panorama.entity';
import { PanoramaResponseDto } from '../dto/panorama-response.dto';

@Controller('api/panorama')
export class PanoramaController {
    constructor(private panoramaService: PanoramaService) {}
    private readonly logger = new Logger(PanoramaController.name);

    @Get('/')
    async getAllPanorama(): Promise<PanoramaResponseDto[]> {
        return await this.panoramaService.getAllPanorama();
    }

    @Get('/:panoramaId')
    async getPanoramaDetail(@Param('panoramaId') panoramaId: number): Promise<Panorama> {
        return await this.panoramaService.getPanoramaDetail(panoramaId);
    }

    // 공공 API 데이터 저장
  @Post('fetch-data')
  async fetchData() {
    try {
      this.logger.log(`📥 [GET] /fetch-data 호출됨`);
      await this.panoramaService.fetchAndParseData();
      return { message: '세종시 문화유산 데이터 저장 완료' };
    } catch (error) {
      this.logger.error('데이터 저장 실패', error.message);
    }
  }
}