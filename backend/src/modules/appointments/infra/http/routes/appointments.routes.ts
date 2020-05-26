import { Router } from 'express';

import AppointmentsController from '../controllers/AppointmentsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const controller = new AppointmentsController();
const routes = Router();
routes.use(ensureAuthenticated);

// routes.get('/', async function (req, res) {
//     const repository = getCustomRepository(AppointmentsRepository);
//     const appointments = await repository.find();

//     return res.status(200).json(appointments);
// });

routes.post('/', controller.create);

export default routes;
