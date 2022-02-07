import { NextFunction, Request, Response } from 'express';
import ForbiddenError from '../models/errors/forbidden.error.model';
import JWT from 'jsonwebtoken';

async function jwtAuthenticationMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authorizationHeader = req.headers['authorization'];

        if(!authorizationHeader) {
            throw new ForbiddenError('Credenciais nao informadas');
        }

        const [authenticationType, token] = authorizationHeader.split(' ');

        if(authenticationType !== 'Bearer' || !token) { 
            throw new ForbiddenError('Tipo de autenticaçao invalida');
        }

        try {
        const tokenPayload = JWT.verify(token, 'my_secrect_key'); // 'MY_SECRECT_KEY' VEM DE AUTHORIZATION.ROUTE.TS
        
        if(typeof tokenPayload !== 'object' || !tokenPayload.sub) {
            throw new ForbiddenError('Token invalido');
        }

        const user = { 
            uuid: tokenPayload.sub, 
            username: tokenPayload.username
        };

        req.user = user;
        next();
        } catch (error) {
            throw new ForbiddenError('Token invalido');
        }
        
    } catch (error) {
        next(error)
    }
}

export default jwtAuthenticationMiddleware;