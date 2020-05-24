import { Router } from 'express';

import AuthenticateSessionService from '@modules/users/services/AuthenticateSessionService';

const routes = Router();

routes.post('/', async function(req, res) {

    const { email, password } = req.body;

    const service = new AuthenticateSessionService();

    const { user, token } = await service.execute({ email, password });

    delete user.password;

    return res.status(200).json({ user, token });
});

export default routes;
