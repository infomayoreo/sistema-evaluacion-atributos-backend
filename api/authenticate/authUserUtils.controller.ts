import { IUser, LevelAccessDAO, PersonDAO } from '../../db/models';
import { AppResponseModel } from '../../interfaces/appResponseModel';
import * as CommonErrorManager from '../../common/errorManager/AppCommonErrorCodes';

export const userAditionalData = {
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
  }]};

export const goodAuthResponseBuilder = (token:string, user:IUser, permissions:[] | any) : AppResponseModel => {

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

 