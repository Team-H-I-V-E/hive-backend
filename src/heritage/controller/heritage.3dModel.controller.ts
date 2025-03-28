import { Controller, Post, UseInterceptors, UploadedFile, Body, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Heritage3DModelService } from '../service/heritage3dModel.service';

@Controller('api/heritage-3d-models')
export class Heritage3DModelController {
  constructor(private readonly heritage3dModelSerivce: Heritage3DModelService) {}

  // 3D 모델 업로드 API
  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) // multerOptions 제거
  async upload3dModel(
    @Body('heritageId') heritageId: number,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (!file) {
      throw new BadRequestException('파일이 업로드되지 않았습니다.');
    }

    // FileService를 통해 파일 저장
    const uploadResult = await this.heritage3dModelSerivce.uploadFile(file);

    return {
      message: '파일이 성공적으로 업로드되었습니다.',
      modelFileUrl: uploadResult.filePath, // 저장된 파일의 경로 반환
    };
  }
}
