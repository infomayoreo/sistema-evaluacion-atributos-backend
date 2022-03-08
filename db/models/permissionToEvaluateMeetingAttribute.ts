import { DataTypes, Model } from 'sequelize';
import db from '../connections';
import { getNowUtc } from '../utils/db-utc-date';


/** is the permission that has a participant in a specifit meeting
 * only on a specifit attribute
*/
export interface IPermissionToEvaluateMeetingAttribute extends Model {
    id:number;
    createAt:string;
	updateAt:string;
}

export const PermissionToEvaluateMeetingAttributeDAO = db.define<IPermissionToEvaluateMeetingAttribute>('PermissionToEvaluateMettingAttribute', {
    id:{
        primaryKey:true,
        type: DataTypes.INTEGER,
        autoIncrement:true,
        field:'permission_to_evaluate_meeting_attribute_id'
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
},{tableName:'permissions_to_evaluate_metting_attribute', timestamps:false });