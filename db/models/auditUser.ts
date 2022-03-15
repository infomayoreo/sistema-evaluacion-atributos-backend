import { DataTypes, Model } from 'sequelize';
import db from '../connections';
import { getNowUtc } from '../utils/db-utc-date';

export interface IAuditUser extends Model {
    id:number;
    auditableProcessId:number;
    userId:number;
    atTable?:string;
    atColumn?:string;
    oldValue?:string;
    newValue?:string
    dataType?:string;
    createAt:string;
	updateAt:string;
}

export const AuditUserDAO = db.define<IAuditUser>('AuditUser', {
        id:{
            primaryKey:true,
            type: DataTypes.INTEGER,
            autoIncrement:true,
            field:'audit_user_id'
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
        atTable:{
            type:DataTypes.CHAR(100),
            field:'at_table',
            allowNull:true
        },
        atColumn:{
            type:DataTypes.CHAR(100),
            field:'at_column',
            allowNull:true
        },
        oldValue:{
            type:DataTypes.STRING,
            field:'old_value',
            allowNull:true
        },
        newValue:{
            type:DataTypes.STRING,
            field:'new_value',
            allowNull:true
        },
        dataType:{
            type:DataTypes.CHAR(100),
            field:'data_type',
            allowNull:true
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
        tableName:'audit_users', 
        timestamps:false 
    });
