import { DataTypes, Model } from 'sequelize';
import db from '../connections';
import { getNowUtc } from '../utils/db-utc-date';

export interface IParticipantEvaluationPeriodDetail extends Model {
    id:number;
    createAt:string;
    attributeId:number;
	updateAt:string;
}

export const ParticipantEvaluationPeriodDetailDAO = db.define<IParticipantEvaluationPeriodDetail>('ParticipantEvaluationPeriodDetail', {
    id:{
        primaryKey:true,
        type: DataTypes.INTEGER,
        autoIncrement:true,
        field:'participant_evaluation_period_detail_id'
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
},{tableName:'participant_evaluation_peariod_headers_details', timestamps:false });