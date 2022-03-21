import { AppResponseModel } from "../../interfaces/appResponseModel";
import { ResponseHeaderKeys } from "../../types/types";
import { Response } from "express";

export const responseHandler = (res:Response, responseData:AppResponseModel) : void => {

    res.setHeader(ResponseHeaderKeys.KEY_APP_STATUS_CODE,responseData.appStatusCode);
    res.setHeader(ResponseHeaderKeys.KEY_APP_STATUS_NAME,responseData.appStatusName);
    res.setHeader(ResponseHeaderKeys.KEY_APP_STATUS_MESSAGE,responseData.appStatusMessage?responseData.appStatusMessage:'');
    if(responseData.extraHeaders) {
        responseData.extraHeaders.forEach((key,value) =>{
            res.setHeader(key,value);
        });
    }
    const body = {
        appStatusCode : responseData.appStatusCode,
        appStatusName: responseData.appStatusName,
        appStatusMessage: responseData.appStatusMessage,
        data:responseData.data,
        erros:responseData.errors
    }

    res.status(responseData.httpStatus).json(body);
}
