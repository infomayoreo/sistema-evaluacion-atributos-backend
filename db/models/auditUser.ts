import { DataTypes, Model } from 'sequelize';
import db from '../connections';
import { getNowUtc } from '../utils/db-utc-date';

export interface IAuditUser extends Model {
    id:number;
    auditableProcessId:number;
    userId:number;
    createAt:string;
	updateAt:string;
}

export const AuditUserDAO = db.define<IAuditUser>('auditUser', {
    id:{
        primaryKey:true,
        type: DataTypes.INTEGER,
        autoIncrement:true,
        field:'audit_user_id'
    },
    auditableProcessId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field:'auditable_process_id'
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
}, {tableName:'audit_users', timestamps:false });
