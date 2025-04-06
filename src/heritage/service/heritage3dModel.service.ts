import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { promises as fs } from 'fs';
import * as path from 'path';
import { Heritage3DModel } from '../entities/heritage3dModel.entity';
import { Heritage } from '../entities/heritage.entity';

@Injectable()
export class Heritage3DModelService {
  private readonly uploadPath = path.join(__dirname, '../../../uploads');

  constructor(
    @InjectRepository(Heritage3DModel)
    private readonly heritage3DModelRepository: Repository<Heritage3DModel>,
  
    @InjectRepository(Heritage)
    private readonly heritageRepository: Repository<Heritage>,
  
  ) {
    this.ensureUploadPathExists();
  }

  async ensureUploadPathExists() {
    try {
      console.log(`업로드 디렉토리 확인 중: ${this.uploadPath}`);
      await fs.mkdir(this.uploadPath, { recursive: true }); // 디렉토리 없으면 생성
      console.log(`업로드 디렉토리 설정 완료: ${this.uploadPath}`);
    } catch (err) {
      console.error('디렉토리 생성 실패:', err);
      throw new HttpException('Failed to create upload directory', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

   async uploadFile(file: Express.Multer.File, heritageId: number): Promise<Heritage3DModel> {
    // 유효한 heritageId인지 확인
    const heritage = await this.heritageRepository.findOne({ where: { heritageId } });
    if (!heritage) {
      throw new NotFoundException(`Heritage with ID ${heritageId} not found`);
    }

    // 업로드 폴더가 없으면 생성
    await fs.mkdir(this.uploadPath, { recursive: true });

    const filePath = path.join(this.uploadPath, file.originalname);

    try {
      // 파일 저장
      await fs.writeFile(filePath, file.buffer);
      console.log(`파일 저장 완료: ${filePath}`);

      // 데이터베이스에 저장
      const model = this.heritage3DModelRepository.create({
        modelFileUrl: `/uploads/${file.originalname}`, // 파일 URL 저장
        heritage,
      });

      return this.heritage3DModelRepository.save(model);
    } catch (err) {
      console.error(' 파일 저장 실패:', err);
      throw new HttpException('Failed to upload file', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  // ✅ 추가: 3D 모델 정보 DB 저장
  async saveModel(modelData: Partial<Heritage3DModel>): Promise<Heritage3DModel> {
    const newModel = this.heritage3DModelRepository.create(modelData);
    return this.heritage3DModelRepository.save(newModel);
  }
}
