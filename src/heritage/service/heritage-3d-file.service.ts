import { Injectable } from '@nestjs/common';
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
    // 파일 업로드 실행
    const result = await this.heritage3DModelService.uploadFile(file);

    // 파일 엔터티 생성
    const newFile = this.fileRepository.create({
      modelFileUrl: result.filePath, // filePath → modelFileUrl
      heritage: { heritageId }, // 관계 설정
    });

    // DB에 저장
    const savedFile = await this.fileRepository.save(newFile);

    return {
      message: 'File uploaded successfully',
      heritage3dModelId: savedFile.heritage3dModelId, // 저장된 ID 반환
      modelFileUrl: savedFile.modelFileUrl,
    };
  }
}
