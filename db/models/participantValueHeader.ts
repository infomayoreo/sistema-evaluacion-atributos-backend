import { DataTypes, Model } from 'sequelize';
import db from '../connections';

/** */
export interface IParticipantValueHeader extends Model {

}

export const ParticipantValueHeaderDAO = db.define<IParticipantValueHeader>('ParticipantValueHeader',{},{tableName:'participant_values_header'});