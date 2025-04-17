import { BadRequestException, Injectable } from '@nestjs/common';
import { Heritage3DModelService } from './heritage3dModel.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Heritage3DModel } from '../entities/heritage3dModel.entity';

@Injectable()
export class Heritage3dFileService {
  constructor(
    private readonly heritage3DModelService: Heritage3DModelService,
    @InjectRepository(Heritage3DModel) 
    private readonly fileRepository: Repository<Heritage3DModel>,
  ) {}

  async uploadProfilePicture(file: Express.Multer.File, heritageId: number) {
    // heritageId가 유효한지 확인
    if (!heritageId) {
      throw new BadRequestException('유효하지 않은 heritageId입니다.');
    }

    //  파일 저장 실행 (heritageId 추가)
    const savedModel = await this.heritage3DModelService.uploadFile(file, heritageId);

    console.log('저장된 파일 경로:', savedModel.modelFileUrl); 

    return {
      message: '파일 업로드 성공',
      heritage3dModelId: savedModel.heritage3dModelId, // 저장된 ID 반환
      modelFileUrl: savedModel.modelFileUrl, // 저장된 파일 URL 반환
    };
  }
}
