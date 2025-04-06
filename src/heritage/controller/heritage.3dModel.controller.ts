import { Controller, Post, UseInterceptors, UploadedFile, Body, BadRequestException, ParseIntPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Heritage3DModelService } from '../service/heritage3dModel.service';
import { HeritageService } from '../service/heritage.service';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('api/heritage-3d-models')
export class Heritage3DModelController {
  constructor(
    private readonly heritage3dModelService: Heritage3DModelService,
    private readonly heritageService: HeritageService
  ) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',  // 저장될 폴더
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const fileExt = extname(file.originalname); // 확장자 가져오기
        cb(null, `${uniqueSuffix}${fileExt}`); // 파일명 설정
      }
    })
  }))
  async upload3dModel(
    @Body('heritageId') heritageId: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (!file) {
      console.error("파일이 업로드되지 않았습니다!");
      throw new BadRequestException('파일을 업로드해야 합니다.');
    }

    const parsedHeritageId = parseInt(heritageId, 10);
    if (isNaN(parsedHeritageId)) {
      throw new BadRequestException('유효한 heritageId를 입력하세요.');
    }

    // 업로드된 파일의 경로 확인 로그
    console.log("업로드된 파일 정보:", file);

    // 파일 URL 생성
    const fileUrl = `${process.env.BASE_URL || 'http://localhost:3000'}/uploads/${file.filename}`;
    console.log("파일 URL:", fileUrl);

    if (!fileUrl) {
      console.error("모델 파일 URL이 없습니다!");
      throw new BadRequestException('모델 파일 URL을 생성할 수 없습니다.');
    }

    // 응답 반환
    return { message: '파일 업로드 성공', fileUrl };
  }
}
