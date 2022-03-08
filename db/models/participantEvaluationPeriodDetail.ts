import { DataTypes, Model } from 'sequelize';
import db from '../connections';

export interface IParticipantEvaluationPeriodDetail extends Model {

}

export const ParticipantEvaluationPeriodDetailDAO = db.define<IParticipantEvaluationPeriodDetail>('ParticipantEvaluationPeriodDetail',{},{tableName:'participant_evaluation_peariod_headers_details'});