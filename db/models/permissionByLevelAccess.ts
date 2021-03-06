import { DataTypes, Model, Sequelize } from 'sequelize';
import db from '../connections';

import { LevelAccessDAO } from './levelAccess';
import { SystemOptionDAO } from './systemOption';

export interface IPermissionLevelAccess extends Model {
    id:number;
    systemOptionId:number,
    levelAccessId:number;
    allowPermission:boolean;
    createAt:string;
	updateAt:string;
}

export const PermissionLevelAccessDAO = db.define<IPermissionLevelAccess>('permissionByLevelAccess', {
        id:{
            primaryKey:true,
            type: DataTypes.INTEGER,
            autoIncrement:true,
            field:'permission_by_level_access_id'
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
        allowPermission:{
            type: DataTypes.BOOLEAN,
            allowNull: false, 
            field:'allow_permission'
        },
        createAt:{
            type: 'TIMESTAMP',
            allowNull: false,
            defaultValue:Sequelize.literal('CURRENT_TIMESTAMP'),
            field:'create_at'
        },
        updateAt:{
            type: 'TIMESTAMP',
            allowNull: false,
            defaultValue:Sequelize.literal('CURRENT_TIMESTAMP'),
            field:'update_at'
        }
    },
    {
        tableName:'permissions_by_level_access',
        timestamps:false,
        indexes:[
            {
                unique:true,
                fields:['system_option_id','level_access_id'],
            }
        ] 
    }
);

export const permissionsByLevelAccessAssociations = () => {

    PermissionLevelAccessDAO.belongsTo(LevelAccessDAO, { 
        foreignKey: {
            name:'levelAccessId',
            allowNull: false
        }
    });

    PermissionLevelAccessDAO.belongsTo(SystemOptionDAO,{ 
        foreignKey: {
            name:'systemOptionId',
            allowNull: false
        }
    });

    
};