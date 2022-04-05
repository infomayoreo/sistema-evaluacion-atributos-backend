import { Request, Response } from "express";
import { responseHandler } from '../../../common/controllers/commonResponseHandler.controller'
import { UserDAO, AuditUserHeaderDAO, AuditUserDetailDAO } from '../../../db/models';
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
import { decodeToken } from "../../../common/middlewares/validate-jwt";
import * as CommonErrorManager from '../../../common/errorManager/AppCommonErrorCodes';


const frontendServerAddress = process.env.FRONTEND_SERVER_ADDRESS || '';
const GOOGLE_WEB_CLIENT_ID = process.env.GOOGLE_WEB_CLIENT_ID || '';
const client = new OAuth2Client(GOOGLE_WEB_CLIENT_ID);


export const googleLogin = async( req: Request, res: Response ) : Promise<void> => {

    const googleToken = req.header('google-id-token');
    verifyGoogleToken(googleToken)
     .then( userInfo => {
        
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
                            sendHtmlEmail(String(email),`<p>${verifyUserUrl}</p>`,"verificar email");
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
                                console.error(error);
                                const data = CommonResponseBuilder(500,authErrosCodes.AUTH_FAIL_TO_GENERATE_PERMISSIONS,[error.message]);
                                data.appStatusMessage = error.message;
                                responseHandler(res, data);
                            });
                        }
                    }

                }).catch(error =>{
                    console.error(error);
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
        console.error(error);
        const data = CommonResponseBuilder(401,authErrosCodes.AUTH_NOT_VALID_GOOGLE_TOKEN,[error.message]);
        data.appStatusMessage = error.message;
        responseHandler(res, data);
    });
}

export const verifyGoogleEmail = async( req: Request, res: Response ) : Promise<void> => {
    const googleToken = req.header('service-token');
    verifyGoogleToken(googleToken)
    .then( userInfo => {
        const token = req.header('token');
        const jwtPayload = decodeToken(String(token));
        
        UserDAO.findOne({
            where:{
                id:jwtPayload.id,
                activate:true
            },
            ...userAditionalData
        }).then(user => {

            if(!user){
                
                const data = CommonResponseBuilder(401,authErrosCodes.AUTH_NOT_VALID_USER);
                responseHandler(res, data);
            }
            else {
                
                AuditUserHeaderDAO.findOne({
                    where:{
                        userId:jwtPayload.id,
                        auditableProcessId:SystemAuditableEnum.VERIFY_EMAIL_COMPLETE.id
                    }
                }).then(isVerify => {
                    
                    if(isVerify || user.googleId) {
                        const data = CommonResponseBuilder(401,authErrosCodes.AUTH_USER_IS_ALREADY_VERIFY);
                        responseHandler(res, data);
                    }
                    else{
                        
                        UserDAO.count({
                            where:{ googleId:userInfo.payload?.sub}
                        }).then( existGoogleId => {

                            if(existGoogleId !== 0) {
                                const data = CommonResponseBuilder(401,authErrosCodes.AUTH_USER_IS_ALREADY_VERIFY);
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
                                        
                                        getUserPermissions(user.id)
                                        .then(permissions => {
        
                                            const data = goodAuthResponseBuilder(String(token),user,permissions);
                                            responseHandler(res, data);

                                            AuditUserHeaderDAO.create({
                                                auditableProcessId:SystemAuditableEnum.VERIFY_EMAIL_COMPLETE.id,
                                                userId:user.id
                                            }).then(auditHeader => {
                                                const column = UserDAO.getAttributes().googleId;
                                                const mType = column.type.toString({});
                                                const auditDetail = {
                                                    auditUserId:auditHeader.id,
                                                    recordId:user.id,
                                                    atTable:UserDAO.tableName,
                                                    atColumn:column.field,
                                                    oldValue:user.googleId,
                                                    newValue:userInfo.payload?.sub,
                                                    dataType:mType,
                                                    
                                                };
                                                
                                                AuditUserDetailDAO.create(auditDetail).then(() => {
                                                    UserDAO.update({googleId:userInfo.payload?.sub},{where:{id:user.id}
                                                    }).catch(console.error);
                                                }).catch(console.error);
                                            }).catch(console.error);
        
                                        }).catch(error =>{
                                            console.error(error);
                                            const data = CommonResponseBuilder(500,authErrosCodes.AUTH_FAIL_TO_GENERATE_PERMISSIONS,[error.message]);
                                            data.appStatusMessage = error.message;
                                            responseHandler(res, data);
                                        });
                                       
                                    }

                                }).catch(error =>{
                                    console.error(error);
                                    const data = CommonResponseBuilder(500,authErrosCodes.AUTH_FAIL_TO_GENERATE_ACCESS,[error.message]);
                                    data.appStatusMessage = error.message;
                                    responseHandler(res, data);
                                });
                            }

                        }).catch(error=> {
                            console.error(error);
                            const data = CommonResponseBuilder(500,CommonErrorManager.commonErrorsCodes.FAIL_TO_GET_RECORD,[error.message]);
                            data.appStatusMessage = error.message;
                            responseHandler(res, data);
                        });
                    }

                }).catch(error=> {
                    console.error(error);
		            const data = CommonResponseBuilder(500,CommonErrorManager.commonErrorsCodes.FAIL_TO_GET_RECORD,[error.message]);
		            data.appStatusMessage = error.message;
		            responseHandler(res, data);
                });
            }
            
        }).catch(error => {
            console.error(error);
            const data = CommonResponseBuilder(500,CommonErrorManager.commonErrorsCodes.FAIL_TO_GET_RECORD,[error.message]);
            data.appStatusMessage = error.message;
            responseHandler(res, data);
        });
    }).catch(error => {
        console.error(error);
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
