import { Router } from 'express';

import sessionRoutes from '@modules/users/infra/http/routes/session.routes';
import appointmentsRoutes from '@modules/appointments/infra/http/routes/appointments.routes';
import usersRoutes from '@modules/users/infra/http/routes/users.routes';

const routes = Router();

routes.use('/session', sessionRoutes);
routes.use('/appointments', appointmentsRoutes);
routes.use('/users', usersRoutes);

export default routes;
