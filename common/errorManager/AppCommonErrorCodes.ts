import {CommonErrorDataContainer} from './CommonErrorDataContainer';

let currentErrorNumber  : number = 1000;
const WITHOUT_ERRORS = 0;
const WITHOUT_ERRORS_NAME = "OK";
const errorsSetNames = new Set<string>();
const errorsHashCodeSet = new Set<number>();
const errorMapNames = new Map<number, string>();
const hashCodeOfNameMap = new Map<number, number>();

const nextErrorNumber = (errorName :string) : number =>{

    if(errorsSetNames.has(errorName)) 
    {
        throw new Error(`The error name is repeated: ${errorName}`);
    }
    const hash = hashFromName(errorName);
    if(errorsHashCodeSet.has(hash))
    {
        throw new Error(`The error hash is repeated. error: ${errorName}, hash: ${hash}`);
    }
    currentErrorNumber++;
    errorsHashCodeSet.add(hash);
    hashCodeOfNameMap.set(currentErrorNumber,hash);
    errorMapNames.set(currentErrorNumber,errorName);
    errorsSetNames.add(errorName);
    return currentErrorNumber;
};

const hashFromName = (errorName:string) : number => 
{
    let hash = 0;
    for (let i = 0, len = errorName.length; i < len; i++) {
        let chr = errorName.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

const getErrorName = (errorCode:number) : string => {
    const errorName = errorMapNames.get(errorCode);
    return (errorName !== null &&  errorName !== undefined)? errorName: "unknown error";
}

const buildErrorDataContainer = (errorCode:number) : CommonErrorDataContainer => {

    if(errorCode === WITHOUT_ERRORS) 
    {
      return new CommonErrorDataContainer(WITHOUT_ERRORS, WITHOUT_ERRORS_NAME);
    }
    const errorName = getErrorName(errorCode);
    const temp = hashCodeOfNameMap.get(errorCode);
    const hash =  (temp !== null &&  temp !== undefined)? hashCodeOfNameMap.get(errorCode) : hashCodeOfNameMap.get(commonErrorsCodes.UNKNOWN_ERROR);
    const errorDataContainer = new CommonErrorDataContainer(hash ? hash : -1, errorName);
    return errorDataContainer;
}

errorsHashCodeSet.add(hashFromName(WITHOUT_ERRORS_NAME));
hashCodeOfNameMap.set(WITHOUT_ERRORS,hashFromName(WITHOUT_ERRORS_NAME));
errorMapNames.set(WITHOUT_ERRORS,WITHOUT_ERRORS_NAME);
errorsSetNames.add(WITHOUT_ERRORS_NAME);

const commonErrorsCodes = {
    UNKNOWN_ERROR:nextErrorNumber("UNKNOWN_ERROR"),
    BAD_FORMAT_EMAIL:nextErrorNumber("BAD_FORMAT_EMAIL"),
    EMAIL_IS_REQUIRED:nextErrorNumber("EMAIL_IS_REQUIRED"),
    FAIL_TO_GET_RECORD:nextErrorNumber("FAIL_TO_GET_RECORD"),
    FAIL_TO_INSERT_RECORD:nextErrorNumber("FAIL_TO_INSERT_RECORD"),
    FAIL_TO_COMPLETE_TRANSACTION:nextErrorNumber("FAIL_TO_COMPLETE_TRANSACTION"),
    PAGE_NOT_VALID_DATA_TYPE:nextErrorNumber("PAGE_NOT_VALID_DATA_TYPE"),
    LIMIT_NOT_VALID_DATA_TYPE:nextErrorNumber("LIMIT_NOT_VALID_DATA_TYPE"),
} as const;



export {
    nextErrorNumber, getErrorName, buildErrorDataContainer, WITHOUT_ERRORS, commonErrorsCodes
}

