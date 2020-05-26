// modules
import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';

// files
import '@shared/infra/typeorm';
import '@shared/container';
import routes from './routes';
import uploadConfig from '@config/upload';

import AppError from '@shared/errors/AppError';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use(function(error: Error, req: Request, res: Response, next: NextFunction) {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            status: 'error',
            message: error.message
        });
    }

    console.log(error);

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
})

app.listen(3333, function () {
    console.log('backend started on port 3333!');
});
