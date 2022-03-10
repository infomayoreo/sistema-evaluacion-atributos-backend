import { DataTypes, Model } from 'sequelize';
import db from '../connections';
import { getNowUtc } from '../utils/db-utc-date';

export interface IParticipantEvaluationPeriodHeader extends Model {
    id:number;
    personId:number;
    createAt:string;
	updateAt:string;
}

export const ParticipantEvaluationPeriodHeaderDAO = db.define<IParticipantEvaluationPeriodHeader>('ParticipantEvaluationPeriodHeader', {
    id:{
        primaryKey:true,
        type: DataTypes.INTEGER,
        autoIncrement:true,
        field:'participant_evaluation_period_header_id'
    },
    personId:{
        type: DataTypes.INTEGER,
        allowNull:false,
        field:'person_id'
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
},{tableName:'participant_evaluation_peariod_headers', timestamps:false });