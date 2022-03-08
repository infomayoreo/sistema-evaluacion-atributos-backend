import { DataTypes, Model } from 'sequelize';
import db from '../connections';

export interface ISystemAuditableProcess extends Model {

}

export const SystemAuditableProcessDAO = db.define<ISystemAuditableProcess>('SystemAuditableProcess',{},{tableName:'system_auditable_process'});