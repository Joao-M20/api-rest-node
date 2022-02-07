import { NextFunction, Request, Response, Router } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import userRepository from "../repositories/user.repository";
import JWT from 'jsonwebtoken';
import { StatusCodes } from "http-status-codes";
import basicAuthenticationMiddleware from "../middlewares/basic.authentication.middleware";
import bearerAuthenticationMiddleware from "../middlewares/jwt.authentication.middleware";
import jwtAuthenticationMiddleware from "../middlewares/jwt.authentication.middleware";

const authorizationRoute = Router();

authorizationRoute.post('/token', basicAuthenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        // "iss"
        // "sub"
        // "aud"
        // "exp"
        // "nbf"
        // "iat"
        // "jti"
        const user = req.user;

        if(!user) {
            throw new ForbiddenError('Usuario nao informado!');
        }

        const jwtPayload = { username: user.username };
        const jwtOptions = { subject: user?.uuid };
        const secretKey = 'my_secrect_key';
        
        const jwt = JWT.sign( jwtPayload, secretKey, jwtOptions);
        res.status(StatusCodes.OK).json({ token: jwt});

    } catch (error) {
        next(error);
    }

});

authorizationRoute.post('/token/validate', jwtAuthenticationMiddleware, (req: Request, res: Response, next: NextFunction)=> {
    res.sendStatus(StatusCodes.OK);
}); 


export default authorizationRoute;


