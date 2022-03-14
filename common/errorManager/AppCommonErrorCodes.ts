import {CommonErrorDataContainer} from './CommonErrorDataContainer';

let currentErrorNumber  : number = 1000;
const WITHOUT_ERRORS = 0;
const WITHOUT_ERRORS_NAME = "WITHOUT_ERRORS";
const errorsSetNames = new Set<string>();
const errorMapNames = new Map<number, string>();

const nextErrorNumber = (erroName :string) : number =>{ 

    if(errorsSetNames.has(erroName)) {
        throw new Error(`The error name is repeated: ${erroName}`);
    }
    currentErrorNumber++;
    errorMapNames.set(currentErrorNumber,erroName);
    errorsSetNames.add(erroName);
    return currentErrorNumber;
};

const getErrorName = (errorCode:number) : string => {
    const errorName = errorMapNames.get(errorCode);
    return (errorName != null &&  errorName != undefined)? errorName: "unknown error";
}

const buildErrorDataContainer = (errorCode:number) : CommonErrorDataContainer => {
    const errorName = getErrorName(errorCode);
    const errorDataContainer = new CommonErrorDataContainer(errorCode,errorName);
    return errorDataContainer;
}

errorsSetNames.add(WITHOUT_ERRORS_NAME);
errorMapNames.set(currentErrorNumber,WITHOUT_ERRORS_NAME);

const commonErrorsCodes = {
    UNKNOWN_ERROR:nextErrorNumber("UNKNOWN_ERROR"),
    BAD_FORMAT_EMAIL:nextErrorNumber("BAD_FORMAT_EMAIL"),
}

export {
    nextErrorNumber, getErrorName, buildErrorDataContainer,WITHOUT_ERRORS, commonErrorsCodes
}