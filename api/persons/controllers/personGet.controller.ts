import { Request, Response } from "express";
import { responseHandler } from "../../../common/controllers/commonResponseHandler.controller";
import { Pagination } from "../../../common/helpers/pagination";
import { PersonDAO, UserDAO, LevelAccessDAO, DataSourceDAO } from '../../../db/models';
import { CommonResponseBuilder } from "../../../interfaces/appResponseModel";
import * as CommonErrorManager from '../../../common/errorManager/AppCommonErrorCodes';

export const allPersons = async( req: Request, res: Response ) : Promise<void> => {

    PersonDAO.count({ where:{activate:true}}).then(count =>{

        const pagination = Pagination(count,req.query.page,req.query.limit);
        const dataRange = { offset:pagination.skip, limit:pagination.limit};
        const baseQuery = { 
            where:{activate:true},
            include:[{
                model:UserDAO,
                attributes:{
                    exclude:['googleId']
                },
                include:[{
                    model:LevelAccessDAO,
                    attributes:{
                        exclude:['activate']
                    },
                }]
            },
            {
                model:DataSourceDAO,
                attributes:{
                    exclude:['url']
                }
            }]
        };
        let query = baseQuery;
        if(pagination.currentPage === 0) {
            query = {...baseQuery,...dataRange};
        }
        PersonDAO.findAll(query).then(persons => {
            const data = CommonResponseBuilder(200,CommonErrorManager.WITHOUT_ERRORS);
            data.data = {
                persons,
                pagination
            };
            responseHandler(res, data); 

        }).catch(error =>{
            console.error(error);
            const data = CommonResponseBuilder(500,CommonErrorManager.commonErrorsCodes.FAIL_TO_GET_RECORD,[error.message]);
            data.appStatusMessage = error.message;
            responseHandler(res, data);
        });
    }).catch(error =>{
        console.error(error);
        const data = CommonResponseBuilder(500,CommonErrorManager.commonErrorsCodes.FAIL_TO_GET_RECORD,[error.message]);
        data.appStatusMessage = error.message;
        responseHandler(res, data);
    });
    
}