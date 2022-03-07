class CommonErrorDataContainer {
    
    private _errorCode:number;
    private _errorName:string;

    constructor(errorNumber:number,errorName:string) {
        this._errorCode = errorNumber;
        this._errorName = errorName;
    }

    public get errorCode():number {
        return this._errorCode;
    }

    public get errorName():string {
        return this._errorName;
    }
}

export {
    CommonErrorDataContainer
}