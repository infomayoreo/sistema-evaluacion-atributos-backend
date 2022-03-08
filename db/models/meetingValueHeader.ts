import { DataTypes, Model } from 'sequelize';
import db from '../connections';

export interface IMeetingValueHeader extends Model {

}

export const MeetingValueHeaderDAO = db.define<IMeetingValueHeader>('MeetingValueHeader',{},{tableName:'meeting_value_headers'});