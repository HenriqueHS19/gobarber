import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import User from '@modules/users/infra/typeorm/entities/Users';
import uploadConfig from '@config/upload';

import AppError from '@shared/errors/AppError';

interface Request {
    userId: string;
    avatarFilename: string;
}

export default class UpdateAvatarUser {
    public async execute({ userId, avatarFilename }: Request): Promise <User> {

        const repository = getRepository(User);

        const user = await repository.findOne(userId);

        if (!user) {
            throw new AppError('Only authenticated users can chaged avatar.', 401);
        }

        if (user.avatar) {
            // delete avatar
            const avatarPath = path.join(uploadConfig.directory, user.avatar);
            const fileExists = await fs.promises.stat(avatarPath);

            if (fileExists) {
                await fs.promises.unlink(avatarPath);
            }
        }

        user.avatar = avatarFilename;

        await repository.save(user);

        return user;
    }
}
