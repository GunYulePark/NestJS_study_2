import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

const createFolder = (folder: string) => {
  try {
    console.log('💾 Create a root uploads folder...');

    fs.mkdirSync(path.join(__dirname, '..', `uploads`));
    // mkdirSync 폴더 만들기. __dirname현재폴더의 .. 부모폴더로 가서 uploads 하라.
  } catch (error) {
    console.log('The folder already exists...');
  }

  try {
    console.log(`💾 Create a ${folder} uploads folder...`);

    fs.mkdirSync(path.join(__dirname, '..', `uploads/${folder}`));
  } catch (error) {
    console.log(`The ${folder} folder already exists...`);
  }
};

const storage = (folder: string): multer.StorageEngine => {
  createFolder(folder);

  return multer.diskStorage({
    destination(req, file, cb) {
      //* 어디에 저장할 지

      const folderName = path.join(__dirname, '..', `uploads/${folder}`);

      cb(null, folderName); // destination
    },

    filename(req, file, cb) {
      //* 어떤 이름으로 올릴 지

      const ext = path.extname(file.originalname);
      // extname()은 .확장자만 남긴다.

      const fileName = `${path.basename(
        file.originalname,

        ext,
      )}${Date.now()}${ext}`;

      cb(null, fileName);
    },
  });
};

export const multerOptions = (folder: string) => {
  const result: MulterOptions = {
    storage: storage(folder),
  };

  return result;
};
