import { injectable, inject } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import User from '@modules/users/infra/typeorm/entities/Users';

import AppError from '@shared/errors/AppError';

interface IRequest {
    userId: string;
    avatarFilename: string;
}

@injectable()
export default class UpdateAvatarUser {

    private repository: IUsersRepository;
    private storageProvider: IStorageProvider;

    constructor(
        @inject('UsersRepository')
        repository: IUsersRepository,

        @inject('StorageProvider')
        storageProvider: IStorageProvider,
    ) {
        this.repository = repository;
        this.storageProvider = storageProvider;
    }

    public async execute({ userId, avatarFilename }: IRequest): Promise <User> {

        const user = await this.repository.findById(userId);

        if (!user) {
            throw new AppError('Only authenticated users can chaged avatar.', 401);
        }

        if (user.avatar) {
            await this.storageProvider.deleteFile(user.avatar);
        }

        const fileName = await this.storageProvider.saveFile(avatarFilename)

        user.avatar = fileName;

        await this.repository.save(user);

        return user;
    }
}
