import { DataTypes, Model } from 'sequelize';
import db from '../connections';

/** is the permission that has a participant to evaluate another one, in a specifit 
 * attribute for a specifit meeting.
*/
export interface IPermissionToEvaluateParticipantAttribute extends Model {

}

export const PermissionToEvaluateParticipanteAttributeDAO = db.define<IPermissionToEvaluateParticipantAttribute>('PermissionToEvaluateParticipanteAttribute',{},{tableName:'permissions_to_evaluate_participants_attributes'});