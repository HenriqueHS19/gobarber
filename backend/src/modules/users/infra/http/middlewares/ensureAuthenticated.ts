import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import config from '@config/auth';

interface TokenPayload {
    iad: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(req: Request, res: Response, next: NextFunction): void {

    const auth = req.headers.authorization;

    if (!auth) {
        throw new Error('JWT token is missing');
    }

    // delete the first position of the vector and take only second position of the vector
    const [, token] = auth.split(' ');

    try {
        const decoded = verify(token, config.jwt.secret);

        const { sub } = decoded as TokenPayload;

        req.user = {
            id: sub,
        }

        return next();
    } catch (error) {
        throw new Error('Invalid JWT Token');
    }

}
