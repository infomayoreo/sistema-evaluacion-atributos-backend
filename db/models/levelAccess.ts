import { DataTypes, Model } from 'sequelize';
import db from '../connections';
import { getNowUtc } from '../utils/db-utc-date';

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
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: getNowUtc(),
        field:'create_at'
    },
    updateAt:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue:getNowUtc(),
        field:'update_at'
    }
},{
    tableName: 'level_access',
    timestamps:false 
});

