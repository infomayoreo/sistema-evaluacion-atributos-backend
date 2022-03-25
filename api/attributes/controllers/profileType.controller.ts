import { Request, Response } from "express";
import { ProfileTypeDAO } from '../../../db/models';
import { CommonResponseBuilder } from "../../../interfaces/appResponseModel";
import * as CommonErrorManager from '../../../common/errorManager/AppCommonErrorCodes';
import { responseHandler } from "../../../common/controllers/commonResponseHandler.controller";

export const allProfileTypes = async( req: Request, res: Response ) : Promise<void> => {

    ProfileTypeDAO.findAll({
        where:{ activate:true}, 
        attributes:{ 
            exclude:['createAt','updateAt','activate']
        }
    }).then(profiles => {
        const data = CommonResponseBuilder(200,CommonErrorManager.WITHOUT_ERRORS);
        data.data = { profiles };
        responseHandler(res, data);
    }).catch(error => {
        console.log(error);
		const data = CommonResponseBuilder(500,CommonErrorManager.commonErrorsCodes.FAIL_TO_GET_RECORD,[error.message]);
		data.appStatusMessage = error.message;
		responseHandler(res, data);
    });

}

export const allAttributes = async( req: Request, res: Response ) : Promise<void> => {

}