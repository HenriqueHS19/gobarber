import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateSessionService from '@modules/users/services/AuthenticateSessionService';

export default class SessionsController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;

        const service = container.resolve(AuthenticateSessionService);

        const { user, token } = await service.execute({ email, password });

        delete user.password;

        return res.status(200).json({ user, token });
    };
}

