import { DataTypes, Model } from 'sequelize';
import db from '../connections';
import { getNowUtc } from '../utils/db-utc-date';

/** is the specfit attribute that going to be evaluate in a specifit meeting */
export interface IAttributeToEvaluateByParticipant extends Model {
    id:number;
    createAt:string;
	updateAt:string;
}

export const AttributeToEvaluateByParticipantDAO = db.define<IAttributeToEvaluateByParticipant>('AttributeToEvaluateByParticipant', {
    id:{
        primaryKey:true,
        type: DataTypes.INTEGER,
        autoIncrement:true,
        field:'attribute_evaluate_participant_id'
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
},{tableName:'attributes_to_evaluate_by_participant', timestamps:false });