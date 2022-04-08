import { AuditUserHeaderDAO, AuditUserDetailDAO } from '../../../db/models';

export class AuditDetailPreInsert {

    recordId!:number;
    atTable!:string ;
    atColumn!:string;
    oldValue?:string;
    newValue?:string;
    dataType!:string;
}


export const createAuditHeader = (userId:number, proccessId:number) => {
    AuditUserHeaderDAO.create({
        userId:userId,
        auditableProcessId:proccessId,
    }).then( () => {
        console.log("audit create successful");
    }).catch(console.error);
}

export const createAuditHeaderAndDetails = (userId:number, proccessId:number, details:AuditDetailPreInsert[]) => {
    AuditUserHeaderDAO.create({
        userId:userId,
        auditableProcessId:proccessId,
    }).then(auditHeader => {
        console.log("audit create successful");
        const autditDetails = details.map(item => {
            return {
                auditUserId:auditHeader.id,
                recordId:item.recordId,
                atTable:item.atTable,
                atColumn:item.atColumn,
                oldValue:item.oldValue,
                newValue:item.newValue,
                dataType:item.dataType
            };
        });
        AuditUserDetailDAO.bulkCreate(autditDetails).then( () =>{
            console.log("audit details create successful");
        }).catch(console.error);
    }).catch(console.error);
}

export abstract class AuditDetailPreInsertBuilder  {
    
    private readonly owner : AuditDetailListBuilder;
    private auditDetail: AuditDetailPreInsert;
    

    constructor(owner : AuditDetailListBuilder) {
        this.owner = owner;
        this.auditDetail = new AuditDetailPreInsert()
    }

    protected getOwner() {
        return this.owner;
    }

    protected addToList() {
        
        this.owner.add(this.build());
    }

    private build() : AuditDetailPreInsert {
        return this.auditDetail;
    }

    setRecordId(recordId:number) : AuditDetailPreInsertBuilder  {
        this.auditDetail.recordId = recordId;
        return this;
    }
    
    setTableName(tableName:string) : AuditDetailPreInsertBuilder  {
        this.auditDetail.atTable = tableName;
        return this;
    }

    setColumnName(columnName:string) : AuditDetailPreInsertBuilder  {
        this.auditDetail.atColumn = columnName;
        return this;
    }

    setOldValue(oldValue?:string) : AuditDetailPreInsertBuilder  {
        this.auditDetail.oldValue = oldValue;
        return this;
    }

    setNewValue(newValue?:string) : AuditDetailPreInsertBuilder  {
        this.auditDetail.newValue = newValue;
        return this;
    }

    setDataType(dataType:string) : AuditDetailPreInsertBuilder  {
        this.auditDetail.dataType = dataType;
        return this;
    }
}

export abstract class AuditDetailListBuilder {
    
    private listBuider: AuditDetailPreInsert[] = [];

    abstract addNewDetail() : AuditDetailPreInsertBuilder; 

    add(item : AuditDetailPreInsert) {
        this.listBuider.push(item);
    }

    getResults() : AuditDetailPreInsert[] {
        return this.listBuider;
    }
}
