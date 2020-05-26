import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

import Appointments from '@modules/appointments/infra/typeorm/entities/Appointments';

import AppError from '@shared/errors/AppError';

interface IRequest {
    provider_id: string;
    date: Date;
}

@injectable()
class CreateAppointmentService {

    private repository: IAppointmentsRepository;

    constructor(@inject('AppointmentsRepository') repository: IAppointmentsRepository) {
        this.repository = repository;
    }

    public async execute({ provider_id, date }: IRequest): Promise <Appointments> {

        const dateParsed = startOfHour(date);

        const findAppointment = await this.repository.findByDate(dateParsed);

        if (findAppointment) {
            throw new AppError('This appointment is already booked', 400);
        }

        const appointment = await this.repository.create({
            provider_id,
            date: dateParsed,
        });

        return appointment;
    }
}

export default CreateAppointmentService;
