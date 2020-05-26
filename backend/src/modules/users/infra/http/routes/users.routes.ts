import { Router } from 'express';
import multer from 'multer';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';
const upload = multer(uploadConfig);

const controller = new UsersController();
const avatarController = new UserAvatarController();

const routes = Router();

routes.post('/', controller.create);

routes.patch('/avatar', ensureAuthenticated, upload.single('avatar'), avatarController.update);

export default routes;
