import { DataTypes, Model } from 'sequelize';
import db from '../connections';


export interface IGlobalSetting extends Model {
    id:number;
    name:string;
    dataType:string;
    currentValue?:string;
    description?:string;
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
        dataType:{
            type: DataTypes.CHAR(100),
            allowNull:false,
            field:'data_type'
        },
        currentValue:{
            type: DataTypes.CHAR(100),
            allowNull:true,
            field:'current_value'
        },
        description:{
            type: DataTypes.CHAR(100),
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
        tableName:'global_settings', 
        timestamps:false 
    });

export const globalSettingAssociations = () => {
    
};