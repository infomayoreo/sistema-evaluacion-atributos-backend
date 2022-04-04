import { decodeToken } from '../../../common/middlewares/validate-jwt';
import { NextFunction, Request, Response } from 'express';
import { UserDAO } from '../../../db/models';
import { CommonResponseBuilder } from '../../../interfaces/appResponseModel';
import * as CommonErrorManager from '../../../common/errorManager/AppCommonErrorCodes';
import { authErrosCodes } from '../../authenticate/helpers/authErrorManager'
import { responseHandler } from '../../../common/controllers/commonResponseHandler.controller';

export const validateActivateUser  = (req: Request, res: Response, next: NextFunction):
    Response<any, Record<string, any>> | undefined | void => {
        
        const token = req.header('token');
        const jwtPayload = decodeToken(String(token));
        
        UserDAO.findOne({where:{
            
            id:jwtPayload.id,
            activate:true

        }}).then(user => {

            if(!user){
			
                const data = CommonResponseBuilder(401,authErrosCodes.AUTH_NOT_VALID_USER);
                responseHandler(res, data);
            }
            else{
                next();
            }

        }).catch(error => {
            console.log(error);
            const data = CommonResponseBuilder(500,CommonErrorManager.commonErrorsCodes.FAIL_TO_GET_RECORD,[error.message]);
            data.appStatusMessage = error.message;
            responseHandler(res, data);
        })
}
