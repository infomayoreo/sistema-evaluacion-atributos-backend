import { decodeToken } from '../../../common/middlewares/validate-jwt';
import { NextFunction, Request, Response } from 'express';
import { LevelAccessDAO, PermissionByUserDAO, PermissionLevelAccessDAO, SystemOptionDAO, UserDAO } from '../../../db/models';
import { CommonResponseBuilder } from '../../../interfaces/appResponseModel';
import * as CommonErrorManager from '../../../common/errorManager/AppCommonErrorCodes';
import { authErrosCodes } from '../../authenticate/helpers/authErrorManager'
import { responseHandler } from '../../../common/controllers/commonResponseHandler.controller';

export const checkUserAccessAndPermissions = (permissionId:number) => {
    
    const validatePermissions  = (req: Request, res: Response, next: NextFunction):
    Response<any, Record<string, any>> | undefined | void => {
        
        const token = req.header('token');
        const jwtPayload = decodeToken(String(token));
        UserDAO.findOne({
            where:{
                id:jwtPayload.id,
                activate:true
            },
            include:[{
                model:LevelAccessDAO
            }]
        }).then(user => {
           
            if(!user){
			
                const data = CommonResponseBuilder(401,authErrosCodes.AUTH_NOT_VALID_USER);
                responseHandler(res, data);
            }
            else{
                
                const levelAccess = user.getDataValue(LevelAccessDAO.name);
                if(!levelAccess || !levelAccess.activate) {
                    const data = CommonResponseBuilder(401,authErrosCodes.AUTH_DENIED_LEVEL_ACCESS);
                    return responseHandler(res, data);
                   
                }

                PermissionByUserDAO.findOne({
                    where:{ 
                        systemOptionId:permissionId,
                        userId:user.id
                    }, 
                    include:[{
                        model:SystemOptionDAO,
                    }]

                }).then(permissionByUser => {
                    
                    
                    if(permissionByUser && (permissionByUser.allowPermission === true || permissionByUser.allowPermission === false))
                    {
                        const systemOptionObject = permissionByUser.getDataValue(SystemOptionDAO.name);
                        if(!systemOptionObject || !systemOptionObject.activate) {
                            const data = CommonResponseBuilder(401,authErrosCodes.AUTH_MASTER_PERMISSIONS_DENIED);
                            return responseHandler(res, data);
                        }
                        else {
                            if(permissionByUser.allowPermission) {
                                next();
                            }
                            else {
                                const data = CommonResponseBuilder(401,authErrosCodes.AUTH_USER_PERMISSIONS_DENIED);
                                return responseHandler(res, data);
                            }
                        }
                    }
                    else {
                        
                        PermissionLevelAccessDAO.findOne({
                            where:{
                                levelAccessId:levelAccess.id,
                                systemOptionId:permissionId,
                            },
                            include:[{
                                model:SystemOptionDAO
                            }]
                        }).then(permissionByLevel => {
                            
                            if(!permissionByLevel){
                                const data = CommonResponseBuilder(401,authErrosCodes.AUTH_DENIED_LEVEL_ACCESS);
                                return responseHandler(res, data);
                            }
                            else{
                                const systemOptionObject = permissionByLevel.getDataValue(SystemOptionDAO.name);
                                if(!systemOptionObject || !systemOptionObject.activate) {
                                    const data = CommonResponseBuilder(401,authErrosCodes.AUTH_MASTER_PERMISSIONS_DENIED);
                                    return responseHandler(res, data);
                                }
                                else {
                                    if(permissionByLevel.allowPermission) {
                                        next();
                                    }
                                    else {
                                        const data = CommonResponseBuilder(401,authErrosCodes.AUTH_DENIED_LEVEL_ACCESS);
                                        return responseHandler(res, data);
                                    }
                                }
                            }

                        }).catch(error => {
                            console.log(error);
                            const data = CommonResponseBuilder(500,CommonErrorManager.commonErrorsCodes.FAIL_TO_GET_RECORD,[error.message]);
                            data.appStatusMessage = error.message;
                            responseHandler(res, data);
                        });
                    }
                    
                }).catch(error => {
                    console.log(error);
                    const data = CommonResponseBuilder(500,CommonErrorManager.commonErrorsCodes.FAIL_TO_GET_RECORD,[error.message]);
                    data.appStatusMessage = error.message;
                    responseHandler(res, data);
                });
            }

        }).catch(error => {
            console.log(error);
            const data = CommonResponseBuilder(500,CommonErrorManager.commonErrorsCodes.FAIL_TO_GET_RECORD,[error.message]);
            data.appStatusMessage = error.message;
            responseHandler(res, data);
        });
    }
    return validatePermissions;
}


