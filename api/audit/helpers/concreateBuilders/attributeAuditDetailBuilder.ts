import { AttributeDAO } from "../../../../db/models/attribute";
import { AuditDetailListBuilder, AuditDetailPreInsertBuilder } from "../auditCreate";


class AttributeAuditBuilder extends AuditDetailPreInsertBuilder {


    setName(newValue:any,oldValue?:any) : AttributeAuditListBuilder {

        this.setTableName(AttributeDAO.tableName)
        .setColumnName(AttributeDAO.getAttributes().name.field!)
        .setDataType(AttributeDAO.getAttributes().name.type.toString({}))
        .setNewValue(newValue)
        .setOldValue(oldValue);
        this.addToList();
        return  this.getOwner() as AttributeAuditListBuilder;
    }

    setAttributeTypeId(newValue:any,oldValue?:any) {
        this.setTableName(AttributeDAO.tableName)
        .setColumnName(AttributeDAO.getAttributes().attributeTypeId.field!)
        .setDataType(AttributeDAO.getAttributes().attributeTypeId.type.toString({}))
        .setNewValue(newValue)
        .setOldValue(oldValue);
        this.addToList();
        return  this.getOwner() as AttributeAuditListBuilder;
    }

    setDescription(newValue:any,oldValue?:any) {
        this.setTableName(AttributeDAO.tableName)
        .setColumnName(AttributeDAO.getAttributes().description.field!)
        .setDataType(AttributeDAO.getAttributes().description.type.toString({}))
        .setNewValue(newValue)
        .setOldValue(oldValue);
        this.addToList();
        return  this.getOwner() as AttributeAuditListBuilder;
    }

    setActivate(newValue:string,oldValue?:string) {
        this.setTableName(AttributeDAO.tableName)
        .setColumnName(AttributeDAO.getAttributes().activate.field!)
        .setDataType(AttributeDAO.getAttributes().activate.type.toString({}))
        .setNewValue(newValue)
        .setOldValue(oldValue);
        this.addToList();
        return  this.getOwner() as AttributeAuditListBuilder;
    }
}

export class AttributeAuditListBuilder extends AuditDetailListBuilder {

    addNewDetail() : AttributeAuditBuilder {
        return new AttributeAuditBuilder(this);
    }
}