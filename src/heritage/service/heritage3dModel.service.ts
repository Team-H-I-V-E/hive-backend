import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';

@Injectable()
export class Heritage3DModelService {
  private uploadPath = '/Users/82105/Documents/3dModelFiles/localStorage';

  constructor() {
    this.ensureUploadPathExists();
  }

  async ensureUploadPathExists() {
    try {
      await fs.mkdir(this.uploadPath, { recursive: true });
    } catch (err) {
      throw new HttpException('Failed to create upload directory', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async uploadFile(file: Express.Multer.File) {
    const filePath = path.join(this.uploadPath, file.originalname);

    try {
      await fs.writeFile(filePath, file.buffer); // 파일 저장
      return {
        filePath, // 저장된 파일 경로
        filename: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
      };
    } catch (err) {
      throw new HttpException('Failed to upload file', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
