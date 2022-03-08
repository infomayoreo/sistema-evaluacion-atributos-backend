import { DataTypes, Model } from 'sequelize';
import db from '../connections';

export interface IPerson extends Model {

}

export const PersonDAO = db.define<IPerson>('Person',{},{tableName:'persons'});