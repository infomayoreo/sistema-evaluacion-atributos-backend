import { DataTypes, Model, Sequelize } from 'sequelize';
import db from '../connections';

import { PermissionLevelAccessDAO } from './permissionByLevelAccess';
import { UserDAO } from './user';

export interface ILevelAccess extends Model {
    id:number;
    name:string;
    description?:string;
    activate:boolean;
    createAt:string;
	updateAt:string;
}

export const LevelAccessDAO = db.define<ILevelAccess> ('LevelAccess', {
    id:{
        primaryKey:true,
        type: DataTypes.INTEGER,
        autoIncrement:false,
        field:'level_access_id'
    },
    name:{
        type: DataTypes.CHAR(100),
        allowNull:false,
        unique:true,
    },
    description:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    activate:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:true,
    },
    createAt:{
        type: 'TIMESTAMP',
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field:'create_at'
    },
    updateAt:{
        type: 'TIMESTAMP',
        allowNull: false,
        defaultValue:Sequelize.literal('CURRENT_TIMESTAMP'),
        field:'update_at'
    }
},{
    tableName: 'level_access',
    timestamps:false 
});

export const levelAccessAssociations = () => {

    LevelAccessDAO.hasMany(UserDAO, {
        foreignKey: {
            name:'levelAccessId',
            allowNull: false
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });

    LevelAccessDAO.hasMany(PermissionLevelAccessDAO, {
        foreignKey: {
            name:'levelAccessId',
            allowNull: false
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });
};