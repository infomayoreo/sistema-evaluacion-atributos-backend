import { DataTypes, Model } from 'sequelize';
import db from '../connections';
import { getNowUtc } from '../utils/db-utc-date';

/** is the permission that has a participant to evaluate another one, in a specifit 
 * attribute for a specifit meeting.
*/
export interface IPermissionToEvaluateParticipantAttribute extends Model {
    id:number;
    createAt:string;
	updateAt:string;
}

export const PermissionToEvaluateParticipantAttributeDAO = db.define<IPermissionToEvaluateParticipantAttribute>('PermissionToEvaluateParticipanteAttribute', {
    id:{
        primaryKey:true,
        type: DataTypes.INTEGER,
        autoIncrement:true,
        field:'permission_to_evaluate_participant_attribute_id'
    },
    createAt:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue:getNowUtc(),
        field:'create_at'
    },
    updateAt:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue:getNowUtc(),
        field:'update_at'
    }
},{tableName:'permissions_to_evaluate_participants_attributes', timestamps:false });