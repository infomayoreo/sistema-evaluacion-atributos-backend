import { DataTypes, Model } from 'sequelize';
import db from '../connections';

/** is the specfit attribute that going to be evaluate in a specifit meeting */
export interface IAttributeToEvaluateByParticipant extends Model {

}

export const AttributeToEvaluateByParticipantDAO = db.define<IAttributeToEvaluateByParticipant>('AttributeToEvaluateByParticipant',{},{tableName:'attributes_to_evaluate_by_participant'});