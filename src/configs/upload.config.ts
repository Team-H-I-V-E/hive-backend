import { diskStorage } from 'multer';
import { extname, join } from 'path';
import * as fs from 'fs';

export const multerOptions = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      const modelId = req.params.id; // heritage3dModelId
      const uploadPath = join(__dirname, `../../uploads/3d-models/${modelId}`);

      // 디렉터리가 존재하지 않으면 생성
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }

      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, 'model' + extname(file.originalname)); 
    },
  }),
};
