import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import User from '@modules/users/infra/typeorm/entities/Users';
import config from '@config/auth';

import AppError from '@shared/errors/AppError';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string;
}

@injectable()
export default class AuthenticateSessionService {

    private repository: IUsersRepository;
    private hash: IHashProvider;

    constructor(
        @inject('UsersRepository') repository: IUsersRepository,
        @inject('HashProvider') hash: IHashProvider
    ) {
        this.repository = repository;
        this.hash = hash;
    }

    public async execute({ email, password }: IRequest): Promise <IResponse> {

        const user = await this.repository.findByEmail(email);

        if (!user) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const isPassword = await this.hash.compareHash(password, user.password);

        if (!isPassword) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const { secret, expiresIn } = config.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });

        return { user, token };

    }
}
