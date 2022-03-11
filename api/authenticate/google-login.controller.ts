import { Request, Response } from "express";
import { ResponseHeaderKeys } from "../../types/types";
import { IUser, UserDAO } from '../../db/models';
import * as CommonErrorManager from '../../common/errorManager/AppCommonErrorCodes';
import * as AuthErrorManager from './authErrorManager'
import { AppResponseModel } from "../../interfaces/appResponseModel";
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
        
        let appStatusCode;
        let appStatusName;
        let info : AppResponseModel;
        
        if(!user) {
            
            
            appStatusCode = AuthErrorManager.authErrosCodes.NOT_VALID_USER;
            appStatusName =  CommonErrorManager.getErrorName(appStatusCode);
            info = {
                appStatusCode : appStatusCode,
                appStatusName: appStatusName,
            };
            res.setHeader(ResponseHeaderKeys.KEY_APP_STATUS_CODE,appStatusCode);
            res.setHeader(ResponseHeaderKeys.KEY_APP_STATUS_NAME,appStatusName);
            res.setHeader(ResponseHeaderKeys.KEY_APP_STATUS_MESSAGE,"");
            res.status(401).json(info);
        }
        else {
             generateJWT({
                userId: user.id,
            }).then( token  => {
                
                appStatusCode = CommonErrorManager.WITHOUT_ERRORS;
                appStatusName =  CommonErrorManager.getErrorName(appStatusCode);
                //res.setHeader('token', token);
                res.setHeader(ResponseHeaderKeys.KEY_APP_STATUS_CODE,appStatusCode);
                res.setHeader(ResponseHeaderKeys.KEY_APP_STATUS_NAME,appStatusName);
                res.setHeader(ResponseHeaderKeys.KEY_APP_STATUS_MESSAGE,"");
                
                info  = {
                    appStatusCode : appStatusCode,
                    appStatusName: appStatusName,
                    data:{ user:user }
                };
                res.status(200).json(info);
            });
        }

    }).catch(error => {
        console.log(error);
        const errorStatuApp = AuthErrorManager.authErrosCodes.AUTH_NOT_VALID_GOOGLE_TOKEN;
        const errorStatusName =  CommonErrorManager.getErrorName(errorStatuApp);
        res.setHeader(ResponseHeaderKeys.KEY_APP_STATUS_CODE,errorStatuApp);
        res.setHeader(ResponseHeaderKeys.KEY_APP_STATUS_NAME,errorStatusName);
        res.setHeader(ResponseHeaderKeys.KEY_APP_STATUS_MESSAGE,"");
        const info : AppResponseModel = {
            appStatusCode : errorStatuApp,
            appStatusName: errorStatusName,
            errors:[error.message]
        };
        res.status(401).json(info);
        
    });
}

const  verifyGoogleToken = async (token:any) => {
    
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: [GOOGLE_WEB_CLIENT_ID]
    });
    console.log(ticket.getPayload());
    return {payload:ticket.getPayload()};
}

