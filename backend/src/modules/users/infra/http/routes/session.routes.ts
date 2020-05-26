import { Router } from 'express';

import SessionsController from '../controllers/SessionsController';

const controller = new SessionsController();
const routes = Router();

routes.post('/', controller.create);

export default routes;
