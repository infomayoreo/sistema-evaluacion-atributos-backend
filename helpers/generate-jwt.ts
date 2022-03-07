import jwt from 'jsonwebtoken';
import config from '../config/config';
import { PayloadJWT } from '../interfaces';

export const generateJWT = (payload: PayloadJWT): Promise<string | Error | undefined> => {
    return new Promise( (resolve, reject): void => {

        jwt.sign(payload, config.jwtSecretPrivateKey, {
            expiresIn: '7d'
        }, (err: Error | null, token: string | undefined ): void => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(token);
            }
        });

    });

};
