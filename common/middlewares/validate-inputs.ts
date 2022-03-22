import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { responseHandler } from '../controllers/commonResponseHandler.controller';
import * as CommonErrorManager from '../../common/errorManager/AppCommonErrorCodes';

export const validateInputs = (req: Request, res: Response, next: NextFunction):
    Response<any, Record<string, any>> | undefined | void => {

    // Retener errores - express-validator
    const errors = validationResult(req);

    if ( !errors.isEmpty() ) {
        const { msg:appStatusCode } = (errors.array({ onlyFirstError: true }))[0];
        const appStatusName = CommonErrorManager.getErrorName(appStatusCode);

        const responseData = {
            httpStatus: 400,
            appStatusCode,
            appStatusName,
            // appStatusMessage: msg,
            errors: errors.array(),
        };

        return responseHandler(res, responseData);
    }

    next();
};
