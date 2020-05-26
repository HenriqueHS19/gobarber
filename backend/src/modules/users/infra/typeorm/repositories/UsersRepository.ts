import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '@modules/users/infra/typeorm/entities/Users';

export default class UserRepository implements IUsersRepository {

    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    public async create({ name, email, password }: ICreateUserDTO): Promise<User> {
        const user = this.repository.create({
            name,
            email,
            password,
        });

        await this.repository.save(user);

        return user;
    }

    public async save(user: User): Promise<User> {
        return await this.repository.save(user);
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.repository.findOne({
            where: { email }
        });

        if (user) {
            return user;
        }
    }

    public async findById(id: string): Promise<User | undefined> {
        const user = await this.repository.findOne({
            where: { id }
        });

        if (user) {
            return user;
        }
    }
}
