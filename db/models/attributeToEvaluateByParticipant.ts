import { DataTypes, Model } from 'sequelize';
import db from '../connections';
import { getNowUtc } from '../utils/db-utc-date';

/** is the specfit attribute that going to be evaluate in a specifit meeting */
export interface IAttributeToEvaluateByParticipant extends Model {
    id:number;
    participantToBeEvaluateId:number;
    attributeId:number;
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
    participantToBeEvaluateId:{
        type: DataTypes.INTEGER,
        field:'participant_to_be_evaluate_id',
        allowNull: false,
    },
    attributeId:{
            
        type: DataTypes.INTEGER,
        field:'attribute_id',
        allowNull: false,
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