import { Request, Response } from "express";
import { ResponseHeaderKeys } from "../../types/types";
import { IUser, UserDAO } from '../../db/models';
import * as CommonErrorManager from '../../common/errorManager/AppCommonErrorCodes';
import * as AuthErrorManager from './authErrorManager'
import { BodyResponseModel, AppResponseModel } from "../../interfaces/appResponseModel";
import { generateJWT } from '../../common/helpers/generate-jwt';

const { OAuth2Client } = require('google-auth-library');
const GOOGLE_WEB_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_WEB_CLIENT_ID);


export const googleLogin = async( req: Request, res: Response ): Promise<void> => {
    
    
    const googleToken = req.header('google-id-token');
    verifyGoogleToken(googleToken)
     .then( userInfo => {
         const email = userInfo.payload['email'];
         return email;
    }).then(email => {
       const user = UserDAO.findOne({where: { email:email, activate:true } });
       return user;
    }).then(user => {
    
        if(!user) {
            
            const appStatusCode = AuthErrorManager.authErrosCodes.NOT_VALID_USER;
            const appStatusName =  CommonErrorManager.getErrorName(appStatusCode);
            
            const data : AppResponseModel = {
                httpStatus:401,
                appStatusCode : appStatusCode,
                appStatusName: appStatusName,
                appStatusMessage:'',
            };
            mResponse(res, data);
        }
        else {
             generateJWT({
                userId: user.id,
            }).then( token  => {
                
                if(!token){
                   throw new Error('fail to generate access');
                }
                else {
                    const appStatusCode = CommonErrorManager.WITHOUT_ERRORS;
                    const appStatusName =  CommonErrorManager.getErrorName(appStatusCode);
                    const extraHeaders = new Map<string,string>();
                    extraHeaders.set('token',String(token));
                    const data : AppResponseModel = {
                        httpStatus:200,
                        appStatusCode : appStatusCode,
                        appStatusName: appStatusName,
                        extraHeaders:extraHeaders,
                        data:{
                            token: String(token)
                        },
                        appStatusMessage:'',
                    };
                    mResponse(res, data);
                }
                
            }).catch(error =>{
                console.log(error);
                const appStatusCode = AuthErrorManager.authErrosCodes.AUTH_FAIL_TO_GENERATE_ACCESS;
                const appStatusName =  CommonErrorManager.getErrorName(appStatusCode);

                const data : AppResponseModel = {
                    httpStatus:500,
                    appStatusCode : appStatusCode,
                    appStatusName: appStatusName,
                    appStatusMessage:error.message,
                    errors:[error.message]
                };
                mResponse(res, data);
            });
        }

        

    }).catch(error => {
        const appStatusCode = AuthErrorManager.authErrosCodes.AUTH_NOT_VALID_GOOGLE_TOKEN;
        const appStatusName =  CommonErrorManager.getErrorName(appStatusCode);
        const data : AppResponseModel = {
            httpStatus:401,
            appStatusCode : appStatusCode,
            appStatusName: appStatusName,
        };
        mResponse(res, data);
    });
}

const verifyGoogleToken = async (token:any) => {
    
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: [GOOGLE_WEB_CLIENT_ID]
    });
    return {payload:ticket.getPayload()};
}

const mResponse = (res:Response, common:AppResponseModel) => {

    res.setHeader(ResponseHeaderKeys.KEY_APP_STATUS_CODE,common.appStatusCode);
    res.setHeader(ResponseHeaderKeys.KEY_APP_STATUS_NAME,common.appStatusName);
    res.setHeader(ResponseHeaderKeys.KEY_APP_STATUS_MESSAGE,common.appStatusMessage?common.appStatusMessage:'');
    if(common.extraHeaders) {
        common.extraHeaders.forEach((key,value) =>{
            res.setHeader(key,value);
        });
    }
    const body = {
        appStatusCode : common.appStatusCode,
        appStatusName: common.appStatusName,
        appStatusMessage: common.appStatusMessage,
        data:common.data,
        erros:common.errors
    }

    res.status(common.httpStatus).json(body);
}
