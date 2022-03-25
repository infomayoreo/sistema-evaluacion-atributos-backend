import { getErrorName } from "../common/errorManager/AppCommonErrorCodes";

export interface AppResponseModel {
    httpStatus:number;
    appStatusCode:number;
    appStatusName:string;
    appStatusMessage?:string;
    extraHeaders?:Map<string,string>;
    data?:any;
    errors?: any[];
}

export const CommonResponseBuilder = (httpStatus:number,appStatusCode:number,errors:any[]=[])  : AppResponseModel => {

    const appStatusName = getErrorName(appStatusCode);
    const appStatusMessage = getErrorMessage(appStatusCode)? getErrorMessage(appStatusCode) :'';
    const data : AppResponseModel = {
        httpStatus,
        appStatusCode,
        appStatusName,
        appStatusMessage,
        errors
    };

    return data;
}

const getErrorMessage = (appStatusCode:number) : string | undefined=> {
    return undefined;
}
