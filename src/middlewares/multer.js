import multer from 'multer';
import { TEMP_UPLOAD_DIR } from '../constants/index.js';


const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, TEMP_UPLOAD_DIR);
    },
    filename: function (req, file, callback) {
        const uniqueSuffix = Date.now();
        callback(null, `${uniqueSuffix}_${file.originalname}`);
    },
});

export const upload = multer({ storage });
