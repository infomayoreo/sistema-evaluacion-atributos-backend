import { Request, Response } from "express";
import { responseHandler } from '../../../common/controllers/commonResponseHandler.controller'
import { UserDAO, AuditUserHeaderDAO } from '../../../db/models';
import { SystemAuditableEnum } from '../../../db/initialRecords';
import { authErrosCodes } from '../helpers/authErrorManager'
import { CommonResponseBuilder } from "../../../interfaces/appResponseModel";
import { generateJWT } from '../../../common/helpers/generate-jwt';
import { getUserPermissions} from '../helpers/permissionsByUser.controller'
import { userAditionalData } from '../helpers/authUserUtils'
import { goodAuthResponseBuilder } from '../helpers/authResponseDataBuilder';
import { OAuth2Client } from 'google-auth-library';
import { getNowUtc } from "../../../db/utils/db-utc-date";
import { Op } from 'sequelize';
import { sendHtmlEmail } from "../../../common/controllers/emailSender";

const frontendServerAddress = process.env.FRONTEND_SERVER_ADDRESS || '';
const GOOGLE_WEB_CLIENT_ID = process.env.GOOGLE_WEB_CLIENT_ID || '';
const client = new OAuth2Client(GOOGLE_WEB_CLIENT_ID);


export const googleLogin = async( req: Request, res: Response ) : Promise<void> => {

    const googleToken = req.header('google-id-token');
    verifyGoogleToken(googleToken)
     .then( userInfo => {
        console.log(userInfo);
        const email = userInfo.payload?.email;
        const googleEmailId = userInfo?.payload?.sub;
        UserDAO.findOne({
            where: { 
                activate:true,
                [Op.or]:[
                    { email: email},
                    { googleId: googleEmailId}
                ]
            },
            ...userAditionalData
        }).then(user => {

            if(!user) {
                const data = CommonResponseBuilder(401,authErrosCodes.AUTH_NOT_VALID_USER);
                responseHandler(res, data);
            }
            else {
    
                generateJWT({
                    id: user.id,
                    createAt:getNowUtc()
                }).then( token  => {
    
                    if(!token){
                       throw new Error('fail to generate access');
                    }
                    else {
    
                        if(!user.googleId || user.googleId != googleEmailId) {
                            
                            const data = CommonResponseBuilder(401,authErrosCodes.AUTH_MUST_VERIFY_YOUR_EMAIL);
                            const verifyUserUrl = new URL(`${frontendServerAddress}/verify-user-signup/google/`);
                            verifyUserUrl.searchParams.append("token", String(token));
                            verifyUserUrl.searchParams.append("service-token",String(googleToken));
                            responseHandler(res, data);
                            sendHtmlEmail(String(email),"verificar email",`<b>${verifyUserUrl}</b>`)
                        }
                        else {
    
                            getUserPermissions(user.id)
                            .then(permissions => {
        
                                const data = goodAuthResponseBuilder(String(token),user,permissions);
                                responseHandler(res, data);
                                AuditUserHeaderDAO.create({
                                    auditableProcessId:SystemAuditableEnum.LOGIN_WITH_GOOGLE.id,
                                    userId:user.id
                                }).catch(console.error);
        
                            }).catch(error =>{
                                console.log(error);
                                const data = CommonResponseBuilder(500,authErrosCodes.AUTH_FAIL_TO_GENERATE_PERMISSIONS,[error.message]);
                                data.appStatusMessage = error.message;
                                responseHandler(res, data);
                            });
                        }
                    }

                }).catch(error =>{
                    console.log(error);
                    const data = CommonResponseBuilder(500,authErrosCodes.AUTH_FAIL_TO_GENERATE_ACCESS,[error.message]);
                    data.appStatusMessage = error.message;
                    responseHandler(res, data);
                });
            }
    
        }).catch(error =>{
            console.error(error);
            const data = CommonResponseBuilder(500,authErrosCodes.AUTH_NOT_VALID_USER,[error.message]);
            data.appStatusMessage = error.message;
            responseHandler(res, data);
        });
 
         
    }).catch(error => {
        console.log(error);
        const data = CommonResponseBuilder(401,authErrosCodes.AUTH_NOT_VALID_GOOGLE_TOKEN,[error.message]);
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
