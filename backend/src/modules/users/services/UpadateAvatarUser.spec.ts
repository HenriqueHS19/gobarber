import FakeUserRepository from '../repositories/fakes/FakeUsersRespository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeDiskStorageProvider';
import UpdateAvatarUser from './UpdateAvatarUser';

import AppError from '@shared/errors/AppError';

describe('UpateAvatar', function() {
    it('should be able upate avatar from user', async function() {
        const fakeRepository = new FakeUserRepository();
        const fakeStorage = new FakeStorageProvider();
        const service = new UpdateAvatarUser(fakeRepository, fakeStorage);

        const user = await fakeRepository.create({
            name: 'John Doe',
            email: 'johndoe@email.com',
            password: '1234',
        });

        await service.execute({
            userId: user.id,
            avatarFilename: 'avatar.jpg',
        });

        expect(user.avatar).toBe('avatar.jpg');
    });

    it('should not be able update avatar from non existing user', async function() {
        const fakeRepository = new FakeUserRepository();
        const fakeStorage = new FakeStorageProvider();
        const service = new UpdateAvatarUser(fakeRepository, fakeStorage);

        expect(
            service.execute({
                userId: 'non-existing-user',
                avatarFilename: 'avatar.jpg',
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should delete old avatar when updating new one', async function() {
        const fakeRepository = new FakeUserRepository();
        const fakeStorage = new FakeStorageProvider();
        const service = new UpdateAvatarUser(fakeRepository, fakeStorage);

        const deleteFile = jest.spyOn(fakeStorage, 'deleteFile');

        const user = await fakeRepository.create({
            name: 'John Doe',
            email: 'johndoe@email.com',
            password: '1234',
        });

        await service.execute({
            userId: user.id,
            avatarFilename: 'avatar.jpg',
        });

        await service.execute({
            userId: user.id,
            avatarFilename: 'avatar2.jpg',
        });

        expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
        expect(user.avatar).toBe('avatar2.jpg');
    });
});
