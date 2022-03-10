import { DataTypes, Model } from 'sequelize';
import db from '../connections';
import { getNowUtc } from '../utils/db-utc-date';

/** */
export interface IParticipantValueHeader extends Model {
    id:number;
    evaluateByParticipantId:number;
    participantToEvaluateId:number;
    createAt:string;
	updateAt:string;
}

export const ParticipantValueHeaderDAO = db.define<IParticipantValueHeader>('ParticipantValueHeader', {
    id:{
        primaryKey:true,
        type: DataTypes.INTEGER,
        autoIncrement:true,
        field:'participant_value_header_id'
    },
    evaluateByParticipantId:{
        type: DataTypes.INTEGER,
        field:'evaluate_by_participant_id',
        allowNull: false,
    },
    participantToEvaluateId:{
        type: DataTypes.INTEGER,
        field:'participant_to_evaluate_id',
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
},{tableName:'participant_values_header', timestamps:false });