import { Request, Response } from "express";
import { responseHandler } from '../../common/controllers/commonResponseHandler.controller'
import { UserDAO, AuditUserHeaderDAO } from '../../db/models';
import { SystemAuditableEnum } from '../../db/initialRecords';
import { authErrosCodes } from './authErrorManager'
import { CommonErrorResponseBuilder } from "../../interfaces/appResponseModel";
import { generateJWT } from '../../common/helpers/generate-jwt';
import { getUserPermissions} from './permissionsByUser.controller'
import { userAditionalData } from './authUserUtils'
import { goodAuthResponseBuilder } from './authResponseDataBuilder';


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
            const data = CommonErrorResponseBuilder(401,authErrosCodes.AUTH_NOT_VALID_USER);
            responseHandler(res, data);
        }
        else {
             generateJWT({
                id: user.id,
            }).then( token  => {

                if(!token){
                   throw new Error('fail to generate access');
                }
                else {

                    getUserPermissions(user.id)
                    .then(permissions => {

                        const data = goodAuthResponseBuilder(String(token),user,permissions);
                        responseHandler(res, data);
                        AuditUserHeaderDAO.create({
                            auditableProcessId:SystemAuditableEnum.LOGIN_WITH_GOOGLE.id,
                            userId:user.id
                        }).catch(console.log);

                    }).catch(error =>{
                        console.log(error);
                        const data = CommonErrorResponseBuilder(500,authErrosCodes.AUTH_FAIL_TO_GENERATE_PERMISSIONS,[error.message]);
                        data.appStatusMessage = error.message;
                        responseHandler(res, data);
                    });
                }

            }).catch(error =>{
                console.log(error);
                const data = CommonErrorResponseBuilder(500,authErrosCodes.AUTH_FAIL_TO_GENERATE_ACCESS,[error.message]);
                data.appStatusMessage = error.message;
                responseHandler(res, data);
            });
        }

    }).catch(error => {
        console.log(error);
        const data = CommonErrorResponseBuilder(401,authErrosCodes.AUTH_NOT_VALID_GOOGLE_TOKEN,[error.message]);
        data.appStatusMessage = error.message;
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
