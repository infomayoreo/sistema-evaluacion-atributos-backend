import { DataTypes, Model } from 'sequelize'
import db from '../connections';

export interface ISystemOption extends Model {

}

export const SystemOptionDAO = db.define<ISystemOption>('SystemOption',{},{ tableName:'system_options'});