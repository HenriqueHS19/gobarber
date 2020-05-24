import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointments from '@modules/appointments/infra/typeorm/entities/Appointments';
import AppointmentsRepository from '@modules/appointments/repositories/AppointmentsRepostirory';

import AppError from '@shared/errors/AppError';

interface Request {
    provider_id: string;
    date: Date;
}

class CreateAppointmentService {

    public async execute({ provider_id, date }: Request): Promise <Appointments> {

        const repository = getCustomRepository(AppointmentsRepository);

        const dateParsed = startOfHour(date);

        const findAppointment = await repository.findByDate(dateParsed);

        if (findAppointment) {
            throw new AppError('This appointment is already booked', 400);
        }

        const appointment = await repository.create({
            provider_id,
            date: dateParsed,
        });

        await repository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;
