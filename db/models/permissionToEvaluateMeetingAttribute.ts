import { DataTypes, Model } from 'sequelize';
import db from '../connections';

/** is the permission that has a participant in a specifit meeting
 * only on a specifit attribute
*/
export interface IPermissionToEvaluateMeetingAttribute extends Model {

}

export const PermissionToEvaluateMettingAttributeDAO = db.define<IPermissionToEvaluateMeetingAttribute>('PermissionToEvaluateMettingAttribute',{},{tableName:'permissions_to_evaluate_metting_attribute'});