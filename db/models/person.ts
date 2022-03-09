import { DataTypes, Model } from 'sequelize';
import db from '../connections';
import { getNowUtc } from '../utils/db-utc-date';

export interface IPerson extends Model {
    id:number;
    userId:number;
    dataSourceId:number;
    createAt:string;
	updateAt:string;
}

export const PersonDAO = db.define<IPerson>('Person', {
    id:{
        primaryKey:true,
        type: DataTypes.INTEGER,
        autoIncrement:true,
        field:'person_id'
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: true, 
        unique:true,
        field:'user_id'
    },
    dataSourceId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        field:'data_source_id'
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
},{ tableName:'persons', timestamps:false });