import { DataTypes, Model } from 'sequelize';
import db from '../connections';
import { getNowUtc } from '../utils/db-utc-date';

export interface IGlobalSetting extends Model {
    id:number;
    name:string;
    createAt:string;
	updateAt:string;
}

export const GlobalSettingDAO = db.define<IGlobalSetting>('GlobalSetting', {
    id:{
        primaryKey:true,
        type: DataTypes.INTEGER,
        autoIncrement:true,
        field:'global_setting_id'
    },
    name:{
        type: DataTypes.CHAR(100),
        allowNull:false,
        unique:true,
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
},{tableName:'global_settings', timestamps:false });