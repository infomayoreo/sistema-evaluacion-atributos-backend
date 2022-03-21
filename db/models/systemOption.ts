import { DataTypes, Model } from 'sequelize'
import db from '../connections';

import { PermissionLevelAccessDAO } from './permissionByLevelAccess';
import { PermissionByUserDAO } from './permissionByUser';

export interface ISystemOption extends Model {
    id:number;
    name:string;
    description?:string;
    createAt:string;
	updateAt:string;
}

export const SystemOptionDAO = db.define<ISystemOption>('SystemOption', {
        id:{
            primaryKey:true,
            type: DataTypes.INTEGER,
            autoIncrement:true,
            field:'system_option_id'
        },
        name:{
            type:DataTypes.CHAR(100),
            allowNull:false,
            unique:true
        },
        description:{
            type:DataTypes.STRING,
            allowNull:true,  
        },
        createAt:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue:DataTypes.NOW,
            field:'create_at'
        },
        updateAt:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue:DataTypes.NOW,
            field:'update_at'
        }
    },
    { 
        tableName:'system_options', 
        timestamps:false 
    });

export const systemOptionAssociations = () => {

    SystemOptionDAO.hasMany(PermissionByUserDAO,{
        foreignKey:{
            name:'userId',
            allowNull:false
        },
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });

    SystemOptionDAO.hasMany(PermissionLevelAccessDAO,{
        foreignKey:{
            name:'levelAccessId',
            allowNull:false
        },
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });
};