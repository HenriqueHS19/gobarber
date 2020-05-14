import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../models/Appointments';

@EntityRepository(Appointment)
class AppoinmentsRepository extends Repository <Appointment> {

    public async findByDate(date: Date): Promise < Appointment | null > {
        const appointment = await this.findOne({
            where: { date }
        });

        if (appointment) {
            return appointment;
        }

        return null;
    }
}

export default AppoinmentsRepository;
