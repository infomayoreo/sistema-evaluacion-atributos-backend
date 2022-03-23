
import jwt from 'jsonwebtoken';
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


    } catch (error) {
        throw error;
    }

};
