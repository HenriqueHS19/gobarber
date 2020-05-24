import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '@modules/users/infra/typeorm/entities/Users';

import AppError from '@shared/errors/AppError';

interface Request {
    name: string;
    email: string;
    password: string;
}

export default class CreateUserService {
    public async execute({ name, email, password }: Request): Promise<User> {

        const repository = getRepository(User);

        const findUser = await repository.findOne({
            where: { email, }
        });

        if (findUser) {
            throw new AppError('E-mail already used.', 400);
        }

        const hashPassword = await hash(password, 8);

        const user = repository.create({
            name,
            email,
            password: hashPassword,
        });

        await repository.save(user);

        return user;
    }
}
