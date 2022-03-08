import { DataTypes, Model } from 'sequelize';
import db from '../connections';

export interface IMeeting extends Model {

}

export const MeetingDAO = db.define<IMeeting>('Meeting',{},{tableName:'meetings'});