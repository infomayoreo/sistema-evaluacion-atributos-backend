import { Request, Response } from "express";
import { responseHandler } from '../../common/controllers/commonResponseHandler.controller'

import { UserDAO } from '../../db/models';
import * as CommonErrorManager from '../../common/errorManager/AppCommonErrorCodes';
import { authErrosCodes } from './authErrorManager'
import { AppResponseModel } from "../../interfaces/appResponseModel";
import { generateJWT } from '../../common/helpers/generate-jwt';
import { getUserPermissions} from './permissionsByUser.controller'
import { userAditionalData} from './userQuearyIncludes.controller'

import { OAuth2Client } from 'google-auth-library';
const GOOGLE_WEB_CLIENT_ID = process.env.GOOGLE_WEB_CLIENT_ID || '';
const client = new OAuth2Client(GOOGLE_WEB_CLIENT_ID);


export const googleLogin = async( req: Request, res: Response ) : Promise<void> => {


    const googleToken = req.header('google-id-token');
    verifyGoogleToken(googleToken)
     .then( userInfo => {

         const email = userInfo.payload?.email;
         return email;
    }).then(email => {
       const user = UserDAO.findOne({
           where: { 
               email:email?.toUpperCase(),
               activate:true 
            },
            ...userAditionalData
        });

        return user;
    }).then(user => {

        if(!user) {

            const appStatusCode = authErrosCodes.AUTH_NOT_VALID_USER;
            const appStatusName =  CommonErrorManager.getErrorName(appStatusCode);

            const data : AppResponseModel = {
                httpStatus:401,
                appStatusCode,
                appStatusName,
                appStatusMessage:'',
            };
            responseHandler(res, data);
        }
        else {
             generateJWT({
                userId: user.id,
            }).then( token  => {

                if(!token){
                   throw new Error('fail to generate access');
                }
                else {

                    getUserPermissions(user)
                    .then(permissions => {
                        const userJson = user.toJSON();
                        const userWithPermissions = {...userJson,permissions};
                       
                        const appStatusCode = CommonErrorManager.WITHOUT_ERRORS;
                        const appStatusName =  CommonErrorManager.getErrorName(appStatusCode);
                        const extraHeaders = new Map<string,string>();
                        extraHeaders.set('token',String(token));
                        const data : AppResponseModel = {
                            httpStatus:200,
                            appStatusCode,
                            appStatusName,
                            extraHeaders,
                            data:{
                                token: String(token),
                                user: userWithPermissions,
                            },
                            appStatusMessage:'',
                        };
                        // todo insert audit log login with google
                        responseHandler(res, data);

                    }).catch(error =>{

                        console.log(error);
                        const appStatusCode = authErrosCodes.AUTH_FAIL_TO_GENERATE_PERMISSIONS;
                        const appStatusName =  CommonErrorManager.getErrorName(appStatusCode);

                        const data : AppResponseModel = {
                            httpStatus:500,
                            appStatusCode,
                            appStatusName,
                            appStatusMessage:error.message,
                            errors:[error.message]
                        };
                        responseHandler(res, data);
                    });


                }

            }).catch(error =>{
                console.log(error);
                const appStatusCode = authErrosCodes.AUTH_FAIL_TO_GENERATE_ACCESS;
                const appStatusName =  CommonErrorManager.getErrorName(appStatusCode);

                const data : AppResponseModel = {
                    httpStatus:500,
                    appStatusCode,
                    appStatusName,
                    appStatusMessage:error.message,
                    errors:[error.message]
                };
                responseHandler(res, data);
            });
        }

    }).catch(error => {
        console.log(error);
        const appStatusCode = authErrosCodes.AUTH_NOT_VALID_GOOGLE_TOKEN;
        const appStatusName =  CommonErrorManager.getErrorName(appStatusCode);
        const data : AppResponseModel = {
            httpStatus:401,
            appStatusCode,
            appStatusName,
            errors:[error.message],
        };
        responseHandler(res, data);
    });
}

const verifyGoogleToken = async (token:any) => {

    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: [GOOGLE_WEB_CLIENT_ID]
    });
    return {payload:ticket.getPayload()};
}
