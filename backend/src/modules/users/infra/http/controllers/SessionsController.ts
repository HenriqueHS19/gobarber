import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;

        const service = container.resolve(AuthenticateUserService);

        const { user, token } = await service.execute({ email, password });

        delete user.password;

        return res.status(200).json({ user, token });
    };
}

