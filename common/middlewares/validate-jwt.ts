
import jwt from 'jsonwebtoken';
import { authErrosCodes } from '../../api/authenticate/authErrorManager';
import config from '../../config/config';

const { jwtSecretPrivateKey } = config;

export const validateJWT = async(token = ''): Promise<void> => {

    try {

        const jwtPayload = jwt.verify(token, jwtSecretPrivateKey);

        if (typeof jwtPayload === 'string') {
            throw new Error('Invalid token type');
        }

        // Se obtiene el uid
        const { id } = jwtPayload;

        // TODO: Crear validacion de fecha de expiracion
        // console.log(new Date(exp * 1000));


    } catch (error ) {
        const e = new Error(authErrosCodes.AUTH_NOT_VALID_TOKEN.toString())
        e.stack = (error instanceof Error)?error?.stack:'Invalid token';
        throw e;
    }

};

export const decodeToken = (token:string) : jwt.JwtPayload => {
    const jwtPayload = jwt.verify(token, jwtSecretPrivateKey);
    if (typeof jwtPayload === 'string') {
        throw new Error('Invalid token type');
    }
    return jwtPayload;
}