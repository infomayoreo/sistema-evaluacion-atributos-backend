import { DataTypes, Model } from 'sequelize';
import db from '../connections';

export interface IDataSource extends Model {}


export const DataSourceDAO = db.define<IDataSource>('DataSource',{},{ tableName:'data_sources'});