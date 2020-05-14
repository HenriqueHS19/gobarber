import { Router } from 'express';

import sessionRoutes from './session.routes';
import appointmentsRoutes from './appointments.routes';
import usersRoutes from './users.routes';

const routes = Router();

routes.use('/session', sessionRoutes);
routes.use('/appointments', appointmentsRoutes);
routes.use('/users', usersRoutes);

export default routes;
