import { DataTypes, Model } from 'sequelize';
import db from '../connections';

export interface IParticipant extends Model {

}

export const ParticipantDAO = db.define('participant',{},{tableName:'participants'});