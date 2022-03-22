import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { responseHandler } from '../../common/controllers/commonResponseHandler.controller'
import { UserDAO } from '../../db/models';
import jwt from 'jsonwebtoken';
import { generateJWT } from '../../common/helpers/generate-jwt';
import config from '../../config/config';
import { getUserPermissions} from './permissionsByUser.controller'
import { userAditionalData} from './userQuearyIncludes.controller'
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
            uid: user.id,
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
	
	UserDAO.findOne({
		where:{
			id:jwtPayload.userId,
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
			
			getUserPermissions(user)
			.then(permissions => {
				const userWithPermissions = {...user.toJSON(),permissions};
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