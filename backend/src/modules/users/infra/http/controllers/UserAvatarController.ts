import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateAvatarUser from '@modules/users/services/UpdateAvatarUser';

export default class UserAvatarController {
    public async update(req: Request, res: Response): Promise<Response> {
        const service = container.resolve(UpdateAvatarUser);

        const user = await service.execute({
            userId: req.user.id,
            avatarFilename: req.file.filename,
        });

        delete user.password;

        return res.status(200).json(user);
    }
}
