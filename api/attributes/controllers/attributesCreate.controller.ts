import { Request, Response } from "express";
import { AttributeDAO, AttributeProfileDAO, AttributeRangeDAO, AttributeTypeDAO, AttributeValueDAO, ProfileTypeDAO } from '../../../db/models';
import db from '../../../db'
import { CommonResponseBuilder } from "../../../interfaces/appResponseModel";
import * as CommonErrorManager from '../../../common/errorManager/AppCommonErrorCodes';
import { responseHandler } from "../../../common/controllers/commonResponseHandler.controller";
import Transaction from "sequelize/types/transaction";
import { getAttributeById } from "./attributesGet.controller";

export const createAttribute = async(req: Request, res: Response ) : Promise<void> => {
   
    const { attributeTypeId, name, description, range, profiles } = req.body;
    let mTransaction: Transaction;
    db.transaction().then(transaction => {
        mTransaction=transaction;
        
        AttributeDAO.create({
            attributeTypeId,
            name,
            description
        },{transaction}).then( newAttribute => {
            
            const rangeArrayObject = [];
            for(let i = 0; i < range.length; i++) {
                rangeArrayObject.push({
                    attributeId:newAttribute.id,
                    attributeValueId:range[i]
                });
            }
            AttributeRangeDAO.bulkCreate(rangeArrayObject,{transaction}).then(() =>{
                
                
                if(profiles && profiles.length > 0 ) {
                    
                    const profileArrayObject = [];
                    for(let i = 0; i < profiles.length; i++) {
                        profileArrayObject.push({
                            attributeId:newAttribute.id,
                            profileTypeId:profiles[i]
                        });
                    }
                    AttributeProfileDAO.bulkCreate(profileArrayObject,{transaction}).then(() =>{
                        
                        commitPendingTransaction(transaction, res, newAttribute.id);
                        
                    }).catch(error => {
                        failCreateRespose(res,error);
                        rollbackTransaction( transaction);
                    });
                }
                else {
                    
                    commitPendingTransaction(transaction, res, newAttribute.id);
                }
                
            }).catch(error => {
                failCreateRespose(res,error);
                rollbackTransaction( transaction);
            });
        }).catch(error => {
            failCreateRespose(res,error);
            rollbackTransaction( transaction);
        })
    }).catch(error => {
        failCreateRespose(res,error);
        if(mTransaction) {
            rollbackTransaction( mTransaction);
        }
    });
}

const commitPendingTransaction = (transaction: Transaction, res: Response, attributeId:number) => {
    transaction.commit().then(() => {
        
        getAttributeById(attributeId).then(attribute => {
            const data = CommonResponseBuilder(200, CommonErrorManager.WITHOUT_ERRORS);
            data.data = { attribute }
            responseHandler(res, data);
        }).catch(error => {
            console.error(error);
            const data = CommonResponseBuilder(500,CommonErrorManager.commonErrorsCodes.FAIL_TO_GET_RECORD,[error.message]);
            data.appStatusMessage = error.message;
            responseHandler(res, data);
        });
        
    }).catch(error => {
        console.error(error);
        rollbackTransaction(transaction);
        const data = CommonResponseBuilder(500,CommonErrorManager.commonErrorsCodes.FAIL_TO_COMPLETE_TRANSACTION,[error.message]);
		data.appStatusMessage = error.message;
		responseHandler(res, data);
    });
}

const rollbackTransaction = (transaction: Transaction) => {
    transaction.rollback().then().catch(console.error);
}

const failCreateRespose = (res: Response,error:Error) => {
    console.error(error);
    const data = CommonResponseBuilder(500,CommonErrorManager.commonErrorsCodes.FAIL_TO_INSERT_RECORD,[error.message]);
    data.appStatusMessage = error.message;
    responseHandler(res, data);
}
