import { getRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentsDTO from '@modules/appointments/dtos/ICreateAppointmentsDTO';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';

class AppoinmentsRepository implements IAppointmentsRepository {

    private repository: Repository<Appointment>;

    constructor() {
        this.repository = getRepository(Appointment);
    }

    public async findByDate(date: Date): Promise < Appointment | undefined > {
        const appointment = await this.repository.findOne({
            where: { date }
        });

        if (appointment) {
            return appointment;
        }
    }

    public async create({provider_id, date}: ICreateAppointmentsDTO): Promise<Appointment> {
        const appointment = await this.repository.create({
            provider_id,
            date,
        });

        await this.repository.save(appointment);

        return appointment;
    }
}

export default AppoinmentsRepository;
