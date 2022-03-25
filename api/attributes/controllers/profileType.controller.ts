import { Request, Response } from "express";
import { AttributeDAO, AttributeRangeDAO, AttributeTypeDAO, AttributeValueDAO, ProfileTypeDAO } from '../../../db/models';
import { CommonResponseBuilder } from "../../../interfaces/appResponseModel";
import * as CommonErrorManager from '../../../common/errorManager/AppCommonErrorCodes';
import { responseHandler } from "../../../common/controllers/commonResponseHandler.controller";
import { Pagination, PaginationResults } from "../../../common/helpers/pagination";

export const allProfileTypes = async( req: Request, res: Response ) : Promise<void> => {

    ProfileTypeDAO.findAll({
        where:{ activate:true }, 
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
    
    AttributeDAO.findAll({
        where:{ activate:true },
        attributes:{
            exclude:['createAt','updateAt','activate']
        },
        include:[{
                model:AttributeTypeDAO,
                attributes:{
                    exclude:['createAt','updateAt']
                }
            },
            {
                model:AttributeRangeDAO,
                attributes:{
                    exclude:['createAt','updateAt']
                },
                include:[{
                    model:AttributeValueDAO,
                    attributes:{
                        exclude:['createAt','updateAt']
                    }
                }]
            }]
    }).then(attributes => {
        const pagination = Pagination(attributes.length,req.params.page,req.params.limit);
        const results = PaginationResults(attributes,pagination);
        const data = CommonResponseBuilder(200,CommonErrorManager.WITHOUT_ERRORS);
        data.data = {
            attributes: results.dataSet,
            pagination:results.pagination
        };
        responseHandler(res, data);

    }).catch(error => {
        console.log(error);
		const data = CommonResponseBuilder(500,CommonErrorManager.commonErrorsCodes.FAIL_TO_GET_RECORD,[error.message]);
		data.appStatusMessage = error.message;
		responseHandler(res, data);
    });
    
}