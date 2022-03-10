import { DataTypes, Model } from 'sequelize';
import db from '../connections';
import { getNowUtc } from '../utils/db-utc-date';

export interface ISystemAuditableProcess extends Model {
    id:number;
    createAt:string;
	updateAt:string;
}

export const SystemAuditableProcessDAO = db.define<ISystemAuditableProcess>('SystemAuditableProcess', {
    id:{
        primaryKey:true,
        type: DataTypes.INTEGER,
        autoIncrement:true,
        field:'auditable_process_id'
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
},{tableName:'system_auditable_process', timestamps:false });