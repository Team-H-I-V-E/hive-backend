// import { Test, TestingModule } from '@nestjs/testing';
// import { promises as fs } from 'fs';
// import * as path from 'path';
// import { Heritage3DModelService } from './heritage3dModel.service';
// import { Readable } from 'stream';

// describe('Heritage3DModelService', () => {
//   let service: Heritage3DModelService;
//   const uploadPath = '/Users/82105/Documents/3dModelFiles/localStorage';

//   beforeEach(async () => { 
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [Heritage3DModelService],
//     }).compile();

//     service = module.get<Heritage3DModelService>(Heritage3DModelService);
//     service['uploadPath'] = uploadPath;  // 경로 설정
//   });

//   afterEach(async () => {
//     // 테스트 후 생성된 파일 삭제
//     try {
//       const files = await fs.readdir(uploadPath);
//       for (const file of files) {
//         await fs.unlink(path.join(uploadPath, file));
//       }
//     } catch (err) {
//       // 파일 삭제 중 오류가 발생하면 무시
//       console.error('Failed to clean up files:', err);
//     }
//   });

//   describe('uploadFile', () => {
//     beforeEach(async () => {
//       // 업로드 디렉토리가 존재하지 않을 경우 생성
//       await fs.mkdir(uploadPath, { recursive: true });
//     });

//     it('should upload a file successfully', async () => {
//       // Given: 실제 파일 데이터를 준비
//       const mockFile: Express.Multer.File = {
//         originalname: 'test.txt',
//         buffer: Buffer.from('This is a test file'),
//         mimetype: 'text/plain',
//         size: 1024,
//         encoding: '7bit',
//         fieldname: 'file',
//         stream: Readable.from([]), 
//         destination: '',
//         filename: '',
//         path: '',
//       };
//       const mockFilePath = path.join(uploadPath, mockFile.originalname);

//       // When: 파일 업로드를 시도
//       const result = await service.uploadFile(mockFile);

//       // Then: 파일 업로드가 성공했는지 확인
//       expect(result).toEqual({
//         message: 'File uploaded successfully',
//         filePath: mockFilePath,
//       });

//       // 파일이 실제로 생성되었는지 확인
//       const fileExists = await fs.stat(mockFilePath).then(() => true).catch(() => false);
//       expect(fileExists).toBe(true);
//     });

//     it('should throw an error when file upload fails', async () => {
//       // Given: Mock 파일과 실패 시나리오 준비
//       const mockFile: Express.Multer.File = {
//         originalname: 'test.txt',
//         buffer: Buffer.from('This is a test file'),
//         mimetype: 'text/plain',
//         size: 1024,
//         encoding: '7bit',
//         fieldname: 'file',
//         stream: Readable.from([]), 
//         destination: '',
//         filename: '',
//         path: '',
//       };
//       jest.spyOn(fs, 'writeFile').mockRejectedValue(new Error('Failed to upload'));

//       // When: 파일 업로드가 실패할 때
//       // Then: 오류가 발생하는지 확인
//       await expect(service.uploadFile(mockFile)).rejects.toThrow('Failed to upload file');
//     });
//   });

//   describe('ensureUploadPathExists', () => {
//     it('should create upload directory if it does not exist', async () => {
//       // Given: 업로드 경로가 존재하지 않도록 Mock 설정
//       jest.spyOn(fs, 'mkdir').mockResolvedValue(undefined);

//       // When: ensureUploadPathExists 메서드를 호출
//       await service.ensureUploadPathExists();

//       // Then: mkdir가 호출되었는지 확인
//       expect(fs.mkdir).toHaveBeenCalledWith(uploadPath, { recursive: true });
//     });

//     it('should throw an error if directory creation fails', async () => {
//       // Given: 업로드 경로 생성 실패 시나리오
//       jest.spyOn(fs, 'mkdir').mockRejectedValue(new Error('Failed to create directory'));

//       // When: ensureUploadPathExists 메서드를 호출
//       // Then: 오류가 발생하는지 확인
//       await expect(service.ensureUploadPathExists()).rejects.toThrow('Failed to create upload directory');
//     });
//   });
// });