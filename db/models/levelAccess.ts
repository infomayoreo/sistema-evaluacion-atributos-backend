import { DataTypes, Model } from 'sequelize';
import db from '../connections';
import { getNowUtc } from '../utils/db-utc-date';

export interface ILevelAccess extends Model {
    id:number;
    createAt:string;
	updateAt:string;
}

export const LevelAccessDAO = db.define<ILevelAccess> ('Rol', {
    id:{
        primaryKey:true,
        type: DataTypes.INTEGER,
        autoIncrement:false,
        field:'level_access_id'
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

