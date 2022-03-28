import { Request, Response } from "express";
import { AttributeDAO, AttributeProfileDAO, AttributeRangeDAO, AttributeTypeDAO, AttributeValueDAO, IAttributeProfile, ProfileTypeDAO } from '../../../db/models';
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

export const allAttributesTypes = async( req: Request, res: Response ) : Promise<void> => {
    AttributeTypeDAO.findAll({
        where:{ activate:true }, 
        attributes:{ 
            exclude:['createAt','updateAt','activate']
        }
    }).then(attributeTypes => {
        const data = CommonResponseBuilder(200,CommonErrorManager.WITHOUT_ERRORS);
        data.data = { attributeTypes };
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
                    exclude:['createAt','updateAt','activate']
                }
            },
            {
                model:AttributeRangeDAO,
                where:{activate:true},
                separate:true,
                attributes:{
                    exclude:['createAt','updateAt','activate']
                },                   
                include:[{
                    model:AttributeValueDAO,
                    attributes:{
                        exclude:['createAt','updateAt']
                    }
                }],
               
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


export const allAttributeByProfiles = async( req: Request, res: Response ) : Promise<void> => {

    const whereCondition = req.query.attributeTypeId? { activate:true, attributeTypeId:Number(req.query.attributeTypeId)}:{ activate:true };
    
    AttributeDAO.count({
        where:{activate:true},
        include:[{
            model:AttributeProfileDAO,
            where:whereCondition,
            right:true,
        }]
    })
    .then(count => Pagination(count,req.query.page,req.query.limit))
    .then(pagination => {

        const dataRange = { offset:pagination.skip, limit:pagination.limit};
        const baseQuery = {
            where:{activate:true},
            attributes:{
                exclude:['createAt','updateAt','activate']
            },
            include:[{
                model:AttributeProfileDAO,
                where:whereCondition,
                right:true,
                attributes:[]
            },
            {
                model:AttributeTypeDAO,
                attributes:{
                    exclude:['createAt','updateAt','activate']
                }
            },
            {
                model:AttributeRangeDAO,
                where:{activate:true},
                separate:true,
                attributes:{
                    exclude:['createAt','updateAt','activate']
                },                   
                include:[{
                    model:AttributeValueDAO,
                    attributes:{
                        exclude:['createAt','updateAt']
                    }
                }]
            }]
        }
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
            responseHandler(res, data)
        })
        .catch(error => {
            console.log(error);
            const data = CommonResponseBuilder(500,CommonErrorManager.commonErrorsCodes.FAIL_TO_GET_RECORD,[error.message]);
            data.appStatusMessage = error.message;
            responseHandler(res, data);
        });
    })
    .catch(error =>{
        console.log(error);
		const data = CommonResponseBuilder(500,CommonErrorManager.commonErrorsCodes.FAIL_TO_GET_RECORD,[error.message]);
		data.appStatusMessage = error.message;
		responseHandler(res, data);
    });  
}


