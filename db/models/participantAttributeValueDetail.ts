import { DataTypes, Model } from 'sequelize';
import db from '../connections';
import { getNowUtc } from '../utils/db-utc-date';

export interface IParticipantAttributeValueDetail extends Model {
    id:number;
    participantValueHeaderId:number;
    valueRangeId:number;
    participantWithPermissionsToEvalAnotherParticpantAttributeId:number;
    participantEvaluationPeriodId:number;
    createAt:string;
	updateAt:string;
}

export const ParticipantAttributeValueDetailDAO = db.define<IParticipantAttributeValueDetail>('ParticipantAttributeValueDetail', {
    id:{
        primaryKey:true,
        type: DataTypes.INTEGER,
        autoIncrement:true,
        field:'participant_attribute_value_detail_id'
    },
    participantValueHeaderId:{
        
        type: DataTypes.INTEGER,
        field:'participant_value_header_id',
        allowNull:false
    },
    valueRangeId: {

        type: DataTypes.INTEGER,
        field:'value_range_id',
        allowNull:false
    },
    participantWithPermissionsToEvalAnotherParticpantAttributeId : {
        
        type: DataTypes.INTEGER,
        field:'evaluator_participant_by_attribute_id',
        allowNull:false
    },
    participantEvaluationPeriodId: {
        
        type: DataTypes.INTEGER,
        field:'participant_evaluation_period_id',
        allowNull:true
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
},{
    
    tableName:'participant_attribute_values_details', 
    timestamps:false 
});