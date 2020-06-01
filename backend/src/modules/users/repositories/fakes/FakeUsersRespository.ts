import { uuid } from 'uuidv4';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '@modules/users/infra/typeorm/entities/Users';

export default class UserRepository implements IUsersRepository {

    private users: User[] = [];

    public async create({ name, email, password }: ICreateUserDTO): Promise<User> {
        const user = new User();

        user.id = uuid();
        user.name = name;
        user.email = email;
        user.password = password;

        this.users.push(user);

        return user;
    }

    public async save(user: User): Promise<User> {
        const index = this.users.findIndex(function(item) {
            if (item.id === user.id) {
                return item;
            }
        });

        this.users[index] = user;

        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const find = this.users.find(function(user) {
            if (user.email === email) {
                return user;
            }
        });

        return find;
    }

    public async findById(id: string): Promise<User | undefined> {
        const find = this.users.find(function(user) {
            if (user.id === id) {
                return user;
            }
        });

        return find;
    }
}
