import { DataTypes, Model } from 'sequelize';
import db from '../connections';

export interface IGlobalSetting extends Model {

}

export const GlobalSettingDAO = db.define<IGlobalSetting>('GlobalSetting',{},{tableName:'global_settings'});