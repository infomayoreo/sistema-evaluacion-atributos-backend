import { DataTypes, Model } from 'sequelize';
import db from '../connections';
import { getNowUtc } from '../utils/db-utc-date';

export interface IDataSource extends Model {
    id:number;
    createAt:string;
	updateAt:string;
}


export const DataSourceDAO = db.define<IDataSource>('DataSource', {
    id:{
        primaryKey:true,
        type: DataTypes.INTEGER,
        autoIncrement:false,
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
},{ tableName:'data_sources', timestamps:false });