import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../../config/config';
import { UserDAO } from '../../db/models';

const { jwtSecretPrivateKey } = config;

export const validateJWT = async(req: Request, res: Response, next: NextFunction):
    Promise<Response<any, Record<string, any>> | undefined> => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'There is no token in the request'
        });
    }

    try {

        const jwtPayload = jwt.verify(token, jwtSecretPrivateKey);

        if (typeof jwtPayload === 'string') {
            res.status(401).json({
                msg: jwtPayload
            });
            return;
        }

        // Se obtiene el uid
        const { uid } = jwtPayload;

        // TODO: Crear validacion de fecha de expiracion
        // console.log(new Date(exp * 1000));

        const user = await UserDAO.findByPk(uid);

        // Verificar que user no sea undefined
        if ( !user ) {
            res.status(401).json({
                msg: 'Invalid token'
            });
            return;
        }

        // Verificar si el user tiene status diferente de 0
        if ( !user.activate ) {
            res.status(401).json({
                msg: 'Invalid token'
            });
            return;
        }

        // Se envia el user para que este disponible en la req
        req.user = user;

        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Invalid token'
        });
    }

};
