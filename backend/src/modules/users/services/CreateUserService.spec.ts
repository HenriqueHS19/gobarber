import FakeUsersRepository from '../repositories/fakes/FakeUsersRespository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

import AppError from '@shared/errors/AppError';

describe('CreateUser', function() {
    it('should be able to create a new user', async function() {
        const fakeRepository = new FakeUsersRepository();
        const fakeHash = new FakeHashProvider();
        const service = new CreateUserService(fakeRepository, fakeHash);

        const user = await service.execute({
            name: 'John Doe',
            email: 'johndoe@email.com',
            password: '1234',
        });

        expect(user).toHaveProperty('id');
    });

    it('should not be able create a new user with same email from another', async function() {
        const fakeRepository = new FakeUsersRepository();
        const fakeHash = new FakeHashProvider();
        const service = new CreateUserService(fakeRepository, fakeHash);

        const email = 'johndoe@email.com';

        await service.execute({
            name: 'John Doe',
            email,
            password: '1234',
        });

        expect(service.execute({
            name: 'John Doe',
            email,
            password: '1234',
        })).rejects.toBeInstanceOf(AppError);
    });
});
