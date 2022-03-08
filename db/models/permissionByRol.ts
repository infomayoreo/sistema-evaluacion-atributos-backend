import { DataTypes, Model } from 'sequelize';
import db from '../connections';

export interface IPermissionByRol extends Model {

}

export const PermissionByRolDAO = db.define<IPermissionByRol>('PermissionByRol',{

    },
    {
        tableName:'permissions_by_rol'
    }
);