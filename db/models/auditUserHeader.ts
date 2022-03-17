import { DataTypes, Model } from 'sequelize';
import db from '../connections';
import { getNowUtc } from '../utils/db-utc-date';

export interface IAuditUserHeader extends Model {
    id:number;
    auditableProcessId:number;
    userId:number;
    createAt:string;
	updateAt:string;
}

export const AuditUserHeaderDAO = db.define<IAuditUserHeader>('AuditUserHeader', {
        id:{
            primaryKey:true,
            type: DataTypes.INTEGER,
            autoIncrement:true,
            field:'audit_user_header_id'
        },
        auditableProcessId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field:'system_auditable_process_id'
        },
        userId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            field:'user_id'
        },
        createAt:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue:getNowUtc(),
            field:'create_at'
        },
        updateAt:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue:getNowUtc(),
            field:'update_at'
        }
    }, 
    {
        tableName:'audit_user_headers', 
        timestamps:false 
    });
