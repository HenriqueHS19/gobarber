import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentsDTO from '@modules/appointments/dtos/ICreateAppointmentsDTO';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';

class AppoinmentsRepository implements IAppointmentsRepository {

    private appointments: Appointment[] = [];

    public async findByDate(date: Date): Promise < Appointment | undefined > {
        const appointment = this.appointments.find(function(item) {
            if (isEqual(item.date, date)) {
                return item;
            }
        });

        if (appointment) {
            return appointment;
        }
    }

    public async create({provider_id, date}: ICreateAppointmentsDTO): Promise<Appointment> {
        const appointment = new Appointment();

        appointment.id = uuid();
        appointment.provider_id = provider_id;
        appointment.date = date;

        this.appointments.push(appointment);

        return appointment;
    }
}

export default AppoinmentsRepository;
