import { DataTypes, Model } from 'sequelize';
import db from '../connections';
import { getNowUtc } from '../utils/db-utc-date';

export interface IPermissionLevelAccess extends Model {
    id:number;
    systemOptionId:number,
    levelAccessId:number;
    createAt:string;
	updateAt:string;
}

export const PermissionLevelAccessDAO = db.define<IPermissionLevelAccess>('PermissionByRol', {
        id:{
            primaryKey:true,
            type: DataTypes.INTEGER,
            autoIncrement:true,
            field:'permission_by_rol_id'
        },
        systemOptionId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            field:'system_option_id'
        },
        levelAccessId:{
            type: DataTypes.INTEGER,
            allowNull: false, 
            field:'level_access_id'
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
        tableName:'permissions_by_level_access',
        timestamps:false 
    }
);