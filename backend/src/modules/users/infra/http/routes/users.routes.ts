import { Router } from 'express';
import multer from 'multer';

import CreateUserService from '@modules/users/services/CreateUserService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UpdateAvatarUser from '@modules/users/services/UpdateAvatarUser';
import uploadConfig from '@config/upload';
const upload = multer(uploadConfig);

const routes = Router();

routes.post('/', async function(req, res) {

    const { name, email, password } = req.body;

    const service = new CreateUserService();

    const user = await service.execute({
        name,
        email,
        password,
    });

    delete user.password;

    return res.status(200).json(user);

});

routes.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async function(req, res) {

    const service = new UpdateAvatarUser();

    const user = await service.execute({
        userId: req.user.id,
        avatarFilename: req.file.filename,
    });

    delete user.password;

    return res.status(200).json(user);

});

export default routes;
