import { DataTypes, Model } from 'sequelize';
import db from '../connections';

export interface IAuditUser extends Model {

}

export const AuditUserDAO = db.define<IAuditUser>('auditUser',{}, {tableName:'audit_users'});
