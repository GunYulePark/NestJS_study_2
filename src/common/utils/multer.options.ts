import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

const createFolder = (folder: string) => {
  try {
    console.log('ð¾ Create a root uploads folder...');

    fs.mkdirSync(path.join(__dirname, '..', `uploads`));
    // mkdirSync í´ë ë§ë¤ê¸°. __dirnameíì¬í´ëì .. ë¶ëª¨í´ëë¡ ê°ì uploads íë¼.
  } catch (error) {
    console.log('The folder already exists...');
  }

  try {
    console.log(`ð¾ Create a ${folder} uploads folder...`);

    fs.mkdirSync(path.join(__dirname, '..', `uploads/${folder}`));
  } catch (error) {
    console.log(`The ${folder} folder already exists...`);
  }
};

const storage = (folder: string): multer.StorageEngine => {
  createFolder(folder);

  return multer.diskStorage({
    destination(req, file, cb) {
      //* ì´ëì ì ì¥í  ì§

      const folderName = path.join(__dirname, '..', `uploads/${folder}`);

      cb(null, folderName); // destination
    },

    filename(req, file, cb) {
      //* ì´ë¤ ì´ë¦ì¼ë¡ ì¬ë¦´ ì§

      const ext = path.extname(file.originalname);
      // extname()ì .íì¥ìë§ ë¨ê¸´ë¤.

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
