import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { responseHandler } from '../../common/controllers/commonResponseHandler.controller'
import { UserDAO } from '../../db/models';
import { SystemAuditableEnum } from '../../db/initialRecords';
import jwt from 'jsonwebtoken';
import { generateJWT } from '../../common/helpers/generate-jwt';
import config from '../../config/config';
import { getUserPermissions} from './permissionsByUser.controller'
import { userAditionalData, goodAuthResponseBuilder } from './authUserUtils.controller'
import { AppResponseModel } from '../../interfaces/appResponseModel';
import * as CommonErrorManager from '../../common/errorManager/AppCommonErrorCodes';
import { authErrosCodes } from './authErrorManager'
const { jwtSecretPrivateKey } = config;

export const login = async( req: Request, res: Response ): Promise<void> => {

    const { email, password } = req.body

	try {
		// Verify if user exist by email
		const user = await UserDAO.findOne({ where: { email } });

		if ( !user ) {
			res.status(400).json({
		    	msg: 'Wrong email or password'
			});
            return;
		}

		
		if ( !user.activate ) {

			res.status(400).json({
				msg: 'Wrong email or password'
			});
            return;
		}

		// Verify password
		const validPassword = bcrypt.compareSync(password, user.password);
		if ( !validPassword ) {
            res.status(400).json({
                msg: 'Wrong email or password'
            });
            return;
		}

		// Generar el JWT
		const token = await generateJWT({
            id: user.id,
        });

		res.status(200).json({ user, token });

	} catch(error) {
		console.log(error);
		res.status(500).json({ msg: 'Talk to the admin' });
	}
};

export const getAuthState = async(req: Request, res: Response): Promise<void> => {
	const token = req.header('token');
	const jwtPayload = jwt.verify(String(token), jwtSecretPrivateKey);
	console.log(jwtPayload);
	UserDAO.findOne({
		where:{
			id:jwtPayload.id,
			activate:true
		},
		...userAditionalData
	}).then(user => {
		if(!user)
		{
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
		else{
			
			getUserPermissions(user.id)
			.then(permissions => {
				const data = goodAuthResponseBuilder(String(token),user,permissions); 
				responseHandler(res, data);
			})
			.catch(error => {
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
		
	})
	.catch(error => {
		console.log(error);
		const appStatusCode = CommonErrorManager.commonErrorsCodes.UNKNOWN_ERROR;
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
	
};