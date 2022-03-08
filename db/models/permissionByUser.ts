import { DataTypes, Model } from 'sequelize';
import db from '../connections';

export interface IPermissionByUser extends Model {

}

export const PermissionByUserDAO = db.define<IPermissionByUser>('PermissionByUser',{},{
    tableName:'permissions_by_user'
});