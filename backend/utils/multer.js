import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,  'public/images');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileName = uniqueSuffix + '-' + file.originalname;
    cb(null, fileName); // Only the file name without path in the filename function
  },
});

const upload = multer({
  storage: storage,
});

export default upload;
