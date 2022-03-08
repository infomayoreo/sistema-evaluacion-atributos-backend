import { DataTypes, Model } from 'sequelize';
import db from '../connections';

export interface IParticipantAttributeValueDetail extends Model {

}

export const ParticipantAttributeValueDetailDAO = db.define<IParticipantAttributeValueDetail>('ParticipantAttributeValueDetail',{},{
    
    tableName:'participant_attribute_values_details'});