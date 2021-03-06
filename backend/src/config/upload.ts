import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
    temp: tmpFolder,
    upload: path.resolve(tmpFolder, 'uploads'),

    storage: multer.diskStorage({
        destination: tmpFolder,
        filename(req, file, callback) {
            const fileHash = crypto.randomBytes(8).toString('HEX');
            const fileName = fileHash + '-' + file.originalname;

            return callback(null, fileName);
        }
    })
};
