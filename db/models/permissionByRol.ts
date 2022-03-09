import { DataTypes, Model } from 'sequelize';
import db from '../connections';
import { getNowUtc } from '../utils/db-utc-date';

export interface IPermissionByRol extends Model {
    id:number;
    systemOptionId:number,
    rolId:number;
    createAt:string;
	updateAt:string;
}

export const PermissionByRolDAO = db.define<IPermissionByRol>('PermissionByRol', {
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
        rolId:{
            type: DataTypes.INTEGER,
            allowNull: false, 
            field:'rol_id'
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
        tableName:'permissions_by_rol',
        timestamps:false 
    }
);