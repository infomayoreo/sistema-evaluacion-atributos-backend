import { DataTypes, Model } from 'sequelize';
import db from '../connections';

export interface IMeetingPlatform extends Model {

}

export const MeetingPlatformDAO = db.define<IMeetingPlatform>('MeetingPlatform',{},{tableName:'meeting_platforms'});