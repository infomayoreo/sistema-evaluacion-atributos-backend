import { Request, Response } from "express";
import { responseHandler } from '../../common/controllers/commonResponseHandler.controller'
import db from "../../db";
import { IUser, LevelAccessDAO, PersonDAO, UserDAO } from '../../db/models';
import * as CommonErrorManager from '../../common/errorManager/AppCommonErrorCodes';
import * as AuthErrorManager from './authErrorManager'
import { AppResponseModel } from "../../interfaces/appResponseModel";
import { generateJWT } from '../../common/helpers/generate-jwt';

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
           where: { email:email?.toUpperCase(), activate:true },
           attributes:{
               exclude:['password','createAt','updateAt','activate']
            },
           include:[{
               model:LevelAccessDAO,
               attributes:{
                exclude:['createAt','updateAt','activate']
             },
           },
           {
               model:PersonDAO,
               attributes:{
                exclude:['createAt','updateAt']
             },
           }]

        });

        return user;
    }).then(user => {

        if(!user) {

            const appStatusCode = AuthErrorManager.authErrosCodes.NOT_VALID_USER;
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

                    userPermissions(user)
                    .then(permissions => {
                        const userJson = user.toJSON();
                        const userWithPermissions = {...userJson,permissions};
                        console.log(userWithPermissions);
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
                        const appStatusCode = AuthErrorManager.authErrosCodes.AUTH_FAIL_TO_GENERATE_PERMISSIONS;
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
                const appStatusCode = AuthErrorManager.authErrosCodes.AUTH_FAIL_TO_GENERATE_ACCESS;
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
        const appStatusCode = AuthErrorManager.authErrosCodes.AUTH_NOT_VALID_GOOGLE_TOKEN;
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

const userPermissions = async (user:IUser) => {
    const [results, metadata]  = await db.query(
    `SELECT DISTINCT (systemOption.system_option_id) AS id,
        systemOption.name AS name,
        systemOption.description AS description,
        ( systemOption.activate AND
            ( case
                WHEN permissionByUser.allow_permission is null
                    THEN permissionByLevel.allow_permission
                    ELSE permissionByUser.allow_permission
              END
            )
         ) AS allow
    FROM system_options AS systemOption
        LEFT JOIN permissions_by_level_access permissionByLevel ON systemOption.system_option_id = permissionByLevel.system_option_id
        LEFT JOIN permissions_by_user permissionByUser ON systemOption.system_option_id = permissionByUser.system_option_id
        LEFT JOIN users AS usersP ON  permissionByUser.user_id  = usersP.user_id
	    LEFT JOIN users AS users ON permissionByLevel.level_access_id =  users.level_access_id
    WHERE  usersP.user_id = :userPId OR users.user_id = :userId;`
    , {
        replacements: {
            userPId:user.id,
            userId:user.id
        } 
    });

    return results;
}