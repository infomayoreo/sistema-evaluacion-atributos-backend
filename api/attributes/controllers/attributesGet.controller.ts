import { Request, Response } from "express";
import { AttributeDAO, AttributeProfileDAO, AttributeRangeDAO, AttributeTypeDAO, AttributeValueDAO, ProfileTypeDAO } from '../../../db/models';
import { CommonResponseBuilder } from "../../../interfaces/appResponseModel";
import * as CommonErrorManager from '../../../common/errorManager/AppCommonErrorCodes';
import { responseHandler } from "../../../common/controllers/commonResponseHandler.controller";
import { Pagination } from "../../../common/helpers/pagination";
import { attributeErrosCodes } from "../helpers/attributeErrorManager";
import { getAttributes, whereCondtionAttributeById, whereCondtionAttributeByType } from "../helpers/queriesHelpers";

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
        console.error(error);
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
        console.error(error);
		const data = CommonResponseBuilder(500,CommonErrorManager.commonErrorsCodes.FAIL_TO_GET_RECORD,[error.message]);
		data.appStatusMessage = error.message;
		responseHandler(res, data);
    });
}

export const allAttributes = async( req: Request, res: Response ) : Promise<void> => {
    
    const whereCondition = whereCondtionAttributeByType(Number(req.query.attributeTypeId));
    
    AttributeDAO.count({where:whereCondition}).then(count => {
        return Pagination(count,req.query.page,req.query.limit);
    }).then(pagination => {
        const dataRange = { offset:pagination.skip, limit:pagination.limit};
        const allAttributesFields = getAttributes();
        const baseQuery = { 
            where:whereCondition,
            attributes: allAttributesFields.attributes,
            include:allAttributesFields.include
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
            
            console.error(error);
            const data = CommonResponseBuilder(500,CommonErrorManager.commonErrorsCodes.FAIL_TO_GET_RECORD,[error.message]);
            data.appStatusMessage = error.message;
            responseHandler(res, data);
        });

    }).catch(error => {
        console.error(error);
		const data = CommonResponseBuilder(500,CommonErrorManager.commonErrorsCodes.FAIL_TO_GET_RECORD,[error.message]);
		data.appStatusMessage = error.message;
		responseHandler(res, data);
    });    
}


export const allAttributeByProfiles = async( req: Request, res: Response ) : Promise<void> => {

    const whereCondition = req.query.profileId? { activate:true, profileTypeId:Number(req.query.profileId)}:{ activate:true };
    
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

        const {attributes, include} = getAttributes();
        
        const joinsTable = [...include,{
            model:AttributeProfileDAO,
            where:whereCondition,
            right:true,
            attributes:[]
        }];
        
        const dataRange = { offset:pagination.skip, limit:pagination.limit};
        const baseQuery = {
            where:{activate:true},
            attributes,
            include:joinsTable
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
            console.error(error);
            const data = CommonResponseBuilder(500,CommonErrorManager.commonErrorsCodes.FAIL_TO_GET_RECORD,[error.message]);
            data.appStatusMessage = error.message;
            responseHandler(res, data);
        });
    })
    .catch(error =>{
        console.error(error);
		const data = CommonResponseBuilder(500,CommonErrorManager.commonErrorsCodes.FAIL_TO_GET_RECORD,[error.message]);
		data.appStatusMessage = error.message;
		responseHandler(res, data);
    });  
}


export const attributeById = async( req: Request, res: Response ) : Promise<void> => {
    
    const attributeId = Number(req.params.id);
    const where = whereCondtionAttributeById(attributeId);
    const query = getAttributes();
    AttributeDAO.findOne({
        where,
        ...query,
    }).then(attribute => {
        
        if(!attribute) {
            const data = CommonResponseBuilder(404,attributeErrosCodes.ATTRIBUTE_ID_NOT_VALID);
            data.appStatusMessage = `attribute with id = ${attributeId} not found`;
            responseHandler(res, data);
        }
        else{
            
            const data = CommonResponseBuilder(200,CommonErrorManager.WITHOUT_ERRORS);
            data.data = {
                attribute
            };
            responseHandler(res, data)
        }

    }).catch(error => {
        console.error(error);
		const data = CommonResponseBuilder(500,CommonErrorManager.commonErrorsCodes.FAIL_TO_GET_RECORD,[error.message]);
		data.appStatusMessage = error.message;
		responseHandler(res, data);
    });
    
}