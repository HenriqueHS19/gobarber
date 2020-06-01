import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

import AppError from '@shared/errors/AppError';

// it - isto

describe('CreateAppointment', function() {
    it('should be able to create new appointment', async function() {
        const fakeRepository = new FakeAppointmentsRepository();
        const service = new CreateAppointmentService(fakeRepository);

        const appointment = await service.execute({
            provider_id: '1234',
            date: new Date(),
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('1234');;
    });

    it('should not be able to create two appointments on the same time', async function() {
        const fakeRepository = new FakeAppointmentsRepository();
        const service = new CreateAppointmentService(fakeRepository);

        const date = new Date();

        await service.execute({
            provider_id: '1234',
            date,
        });

        expect(service.execute({
            provider_id: '1234',
            date,
        })).rejects.toBeInstanceOf(AppError);

    });
});
