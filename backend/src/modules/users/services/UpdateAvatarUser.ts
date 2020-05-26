import path from 'path';
import fs from 'fs';
import { injectable, inject } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/Users';
import uploadConfig from '@config/upload';

import AppError from '@shared/errors/AppError';

interface IRequest {
    userId: string;
    avatarFilename: string;
}

@injectable()
export default class UpdateAvatarUser {

    private repository: IUsersRepository;

    constructor(@inject('UsersRepository') repository: IUsersRepository) {
        this.repository = repository;
    }

    public async execute({ userId, avatarFilename }: IRequest): Promise <User> {

        const user = await this.repository.findById(userId);

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

        await this.repository.save(user)

        return user;
    }
}
