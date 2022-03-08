import { DataTypes, Model } from 'sequelize';
import db from '../connections';

export interface IAttribute extends Model {

}

export const AttributeDAO = db.define<IAttribute>('attribute',{} ,{tableName:'attributes'});

