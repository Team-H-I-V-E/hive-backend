import { Controller, Post, UseInterceptors, UploadedFile, Param, Body, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/configs/upload.config';
import { Heritage3DModelService } from '../service/heritage3dModel.service';


@Controller('api/heritage-3d-models')
export class Heritage3DModelController {
  constructor(private readonly heritage3DModelService: Heritage3DModelService) {}

  // 3D 모델 업로드 API
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async upload3dModel(
    @Body('heritageId') heritageId: number,
    @UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('파일이 업로드되지 않았습니다.');
    }

    // 업로드 후 응답 데이터 생성
    const response = await this.heritage3DModelService.createHeritage3DModel(heritageId, file.filename);
    
    return {
      message: '파일이 성공적으로 업로드 되었습니다.',
      modelFileUrl: `/uploads/3d-models/${file.filename}`,
    }

  }
}
