import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { responseHandler } from '../../../common/controllers/commonResponseHandler.controller'
import { UserDAO } from '../../../db/models';
import { generateJWT } from '../../../common/helpers/generate-jwt';
import { getUserPermissions} from '../helpers/permissionsByUser.controller'
import { userAditionalData } from '../helpers/authUserUtils'
import { goodAuthResponseBuilder } from '../helpers/authResponseDataBuilder';
import { CommonResponseBuilder } from '../../../interfaces/appResponseModel';
import * as CommonErrorManager from '../../../common/errorManager/AppCommonErrorCodes';
import { authErrosCodes } from '../helpers/authErrorManager'
import { decodeToken } from '../../../common/middlewares/validate-jwt';


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
		const validPassword = bcrypt.compareSync(password, 'user.password');
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
			
			getUserPermissions(user.id)
			.then(permissions => {
				const data = goodAuthResponseBuilder(String(token),user,permissions); 
				responseHandler(res, data);
			})
			.catch(error => {
				console.log(error);
				const data = CommonResponseBuilder(500,authErrosCodes.AUTH_FAIL_TO_GENERATE_PERMISSIONS,[error.message]);
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
	
};