import { Request, Response } from "express";
import { AttributeDAO, AttributeRangeDAO, AttributeTypeDAO, AttributeValueDAO, ProfileTypeDAO } from '../../../db/models';
import { CommonResponseBuilder } from "../../../interfaces/appResponseModel";
import * as CommonErrorManager from '../../../common/errorManager/AppCommonErrorCodes';
import { responseHandler } from "../../../common/controllers/commonResponseHandler.controller";
import { Pagination } from "../../../common/helpers/pagination";

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
    
    const whereCondition = req.query.attributeTypeId? { activate:true, attributeTypeId:Number(req.query.attributeTypeId)}:{ activate:true };
    
    AttributeDAO.count({where:whereCondition}).then(count => {
        return Pagination(count,req.query.page,req.query.limit);
    }).then(pagination => {
        const dataRange = { offset:pagination.skip, limit:pagination.limit};
        const baseQuery = { 
            where:whereCondition,
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
                where:{ activate:true },
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
        };
        let query = baseQuery;
        if(pagination.currentPage !== 0) {
            query = { ...baseQuery, ...dataRange}
        }
        AttributeDAO.findAll(query)
        .then(attributes => {

            const data = CommonResponseBuilder(200,CommonErrorManager.WITHOUT_ERRORS);
            data.data = {
                attributes,
                pagination
            };
            responseHandler(res, data); 

        }).catch(error => {
            
            console.log(error);
            const data = CommonResponseBuilder(500,CommonErrorManager.commonErrorsCodes.FAIL_TO_GET_RECORD,[error.message]);
            data.appStatusMessage = error.message;
            responseHandler(res, data);
        });

    }).catch(error => {
        console.log(error);
		const data = CommonResponseBuilder(500,CommonErrorManager.commonErrorsCodes.FAIL_TO_GET_RECORD,[error.message]);
		data.appStatusMessage = error.message;
		responseHandler(res, data);
    });    
}