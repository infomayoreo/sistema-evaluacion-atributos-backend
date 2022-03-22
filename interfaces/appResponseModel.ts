export interface AppResponseModel {
    httpStatus:number;
    appStatusCode:number;
    appStatusName:string;
    appStatusMessage?:string;
    extraHeaders?:Map<string,string>;
    data?:any;
    errors?: any[];
}

