import { DataTypes, Model } from 'sequelize';
import db from '../connections';

export interface IMeetingValueDetail extends Model {
    
}

export const MeetingValueDetailDAO = db.define<IMeetingValueDetail>('MeetingValueDetail',{},{tableName:'meeting_value_details'})