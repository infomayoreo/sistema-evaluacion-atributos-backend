import { IUser } from '../../db/models';
import { AppResponseModel } from '../../interfaces/appResponseModel';
import * as CommonErrorManager from '../../common/errorManager/AppCommonErrorCodes';


export const goodAuthResponseBuilder = (token:string, user:IUser, permissions:unknown[]) : AppResponseModel => {

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
  return data;
}

