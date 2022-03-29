import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { responseHandler } from '../controllers/commonResponseHandler.controller';
import * as CommonErrorManager from '../../common/errorManager/AppCommonErrorCodes';
import { authErrosCodes } from '../../api/authenticate/helpers/authErrorManager';

export const validateInputs = (req: Request, res: Response, next: NextFunction):
    Response<any, Record<string, any>> | undefined | void => {

    // Retener errores - express-validator
    const errors = validationResult(req);

    if ( !errors.isEmpty() ) {
        const { msg:appStatusCode } = (errors.array({ onlyFirstError: true }))[0];
        
        try{
            const status = Number(appStatusCode);
            const appStatusName = CommonErrorManager.getErrorName(status);
            const httpStatus = builtHttpCode(appStatusCode);
            const responseData = {
                httpStatus,
                appStatusCode: status,
                appStatusName,
                // appStatusMessage: msg,
                errors: errors.array(),
            };
            responseHandler(res, responseData);

        }
        catch (error){
            
            const appStatusName = CommonErrorManager.getErrorName(CommonErrorManager.commonErrorsCodes.UNKNOWN_ERROR);
            const responseData = {
                httpStatus:500,
                appStatusCode: CommonErrorManager.commonErrorsCodes.UNKNOWN_ERROR,
                appStatusName,
                appStatusMessage: (error instanceof Error)?error.message:'',
                errors: errors.array(),
            };
            responseHandler(res, responseData);
        }
        return; 
    }

    next();
};


const builtHttpCode = (appStatus:number) : number => {

    let httpCode = 400;
    if(appStatus == authErrosCodes.AUTH_MISSING_TOKEN 
        || appStatus == authErrosCodes.AUTH_NOT_VALID_TOKEN ) {
            httpCode = 401;
        }

    
    return httpCode;
}