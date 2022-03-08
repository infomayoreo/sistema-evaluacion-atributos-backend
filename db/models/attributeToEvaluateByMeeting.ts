import { DataTypes, Model } from 'sequelize';
import db from '../connections';

/**  is the attribute that going to be evaluate in a specifit meeting */
export interface IAttributeToEvaluteByMeeting extends Model {

}

export const AttributeToEvaluteByMeetingDAO = db.define<IAttributeToEvaluteByMeeting>('AttributeToEvaluteByMeeting',{},{tableName:'attributes_to_evaluate_by_meeting'});