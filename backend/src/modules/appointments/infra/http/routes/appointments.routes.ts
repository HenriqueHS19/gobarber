// modules
import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

// files
import AppointmentsRepository from '@modules/appointments/repositories/AppointmentsRepostirory';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const routes = Router();

routes.use(ensureAuthenticated);

routes.get('/', async function (req, res) {
    const repository = getCustomRepository(AppointmentsRepository);
    const appointments = await repository.find();

    return res.status(200).json(appointments);
});

routes.post('/', async function (req, res) {

    const { provider_id, date } = req.body;

    const parsed = parseISO(date);

    const service = new CreateAppointmentService();

    const appointment = await service.execute({
        provider_id,
        date: parsed,
    });

    return res.status(200).json(appointment);

});

export default routes;
