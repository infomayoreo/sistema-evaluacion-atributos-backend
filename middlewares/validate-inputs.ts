import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const validateInputs = (req: Request, res: Response, next: NextFunction):
    Response<any, Record<string, any>> | undefined => {

    // Retener errores - express-validator
    const errors = validationResult(req);

    if ( !errors.isEmpty() ) {
        return res.status(400).json(errors);
    }

    next();
};
