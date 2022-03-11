
export interface AppResponseModel {
    appStatusCode:number;
    appStatusName:string;
    appStatusMessage?:string;
    data?:any;
    errors?:[any];
};