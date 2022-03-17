import { DataTypes, Model } from 'sequelize';
import db from '../connections';
import { getNowUtc } from '../utils/db-utc-date';
import { SystemOptionDAO } from './systemOption';
import { UserDAO } from './user';

export interface IPermissionByUser extends Model {
    id:number;
    systemOptionId:number;
    userId:number;
    allowPermission:boolean;
    createAt:string;
	updateAt:string;
}

export const PermissionByUserDAO = db.define<IPermissionByUser>('PermissionByUser', {
    id:{
        primaryKey:true,
        type: DataTypes.INTEGER,
        autoIncrement:true,
        field:'permission_by_user_id'
    },
    systemOptionId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        field:'system_option_id'
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false, 
        field:'user_id'
    },
    allowPermission:{
        type: DataTypes.BOOLEAN,
        allowNull: false, 
        field:'allow_permission'
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
},{
    tableName:'permissions_by_user',
    timestamps:false 
});

export const permissionsByUserAssociations = () => {

    PermissionByUserDAO.belongsTo(UserDAO, { 
        foreignKey: {
            name:'userId',
            allowNull: false
        }
    });

    PermissionByUserDAO.belongsTo(SystemOptionDAO,{ 
        foreignKey: {
            name:'systemOptionId',
            allowNull: false
        }
    });
};