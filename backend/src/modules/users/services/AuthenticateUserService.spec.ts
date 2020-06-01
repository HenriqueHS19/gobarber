import FakeUserRepository from '../repositories/fakes/FakeUsersRespository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

import AppError from '@shared/errors/AppError';

describe('AuthenticateUser', function() {
    it('should be able to authenticate', async function() {
        const fakeRepository = new FakeUserRepository();
        const fakeHash = new FakeHashProvider();
        const authenticateService = new AuthenticateUserService(fakeRepository, fakeHash);
        const userService = new CreateUserService(fakeRepository, fakeHash);

        const user = await userService.execute({
            name: 'John Doe',
            email: 'johndoe@email.com',
            password: '1234',
        });

        const response = await authenticateService.execute({
            email: 'johndoe@email.com',
            password: '1234',
        });

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
    });

    it('should not be able to authenticate with non existing user', async function() {
        const fakeRepository = new FakeUserRepository();
        const fakeHash = new FakeHashProvider();
        const service = new AuthenticateUserService(fakeRepository, fakeHash);

        expect(
            service.execute({
                email: 'johndoe@email.com',
                password: '1234',
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to authenticate with wrong password', async function() {
        const fakeRepository = new FakeUserRepository();
        const fakeHash = new FakeHashProvider();
        const authenticateService = new AuthenticateUserService(fakeRepository, fakeHash);
        const userService = new CreateUserService(fakeRepository, fakeHash);

        await userService.execute({
            name: 'John Doe',
            email: 'johndoe@email.com',
            password: '1234',
        });

        expect(
            authenticateService.execute({
                email: 'johndoe@email.com',
                password: 'wrong-password',
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});
