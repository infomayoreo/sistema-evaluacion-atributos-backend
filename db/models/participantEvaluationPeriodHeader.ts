import { DataTypes, Model } from 'sequelize';
import db from '../connections';

export interface IParticipantEvaluationPeriodHeader extends Model {

}

export const ParticipantEvaluationPeriodHeaderDAO = db.define<IParticipantEvaluationPeriodHeader>('ParticipantEvaluationPeriodHeader',{},{tableName:'participant_evaluation_peariod_headers'});