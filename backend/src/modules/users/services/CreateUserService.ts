import { injectable, inject } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import User from '@modules/users/infra/typeorm/entities/Users';

import AppError from '@shared/errors/AppError';

interface IRequest {
    name: string;
    email: string;
    password: string;
}

@injectable()
export default class CreateUserService {

    private repository: IUsersRepository;
    private hash: IHashProvider;

    constructor(
        @inject('UsersRepository') repository: IUsersRepository,
        @inject('HashProvider') hash: IHashProvider
    ) {
        this.repository = repository;
        this.hash = hash;
    }

    public async execute({ name, email, password }: IRequest): Promise<User> {

        const findUser = await this.repository.findByEmail(email);

        if (findUser) {
            throw new AppError('E-mail already used.', 400);
        }

        const hashPassword = await this.hash.generateHash(password);

        const user = await this.repository.create({
            name,
            email,
            password: hashPassword,
        });

        return user;
    }
}
