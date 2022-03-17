import { DataTypes, Model } from 'sequelize';
import db from '../connections';
import { getNowUtc } from '../utils/db-utc-date';

export interface IParticipant extends Model {
    id:number;
    meetingId:number;
    personId:number;
    deleted:boolean;
    createAt:string;
	updateAt:string;
}

export const ParticipantDAO = db.define('Participant', {
    id:{
        primaryKey:true,
        type: DataTypes.INTEGER,
        autoIncrement:true,
        field:'participant_id'
    },
    meetingId:{
        type: DataTypes.INTEGER,
        allowNull:false,
        field:'meeting_id'
    },
    personId:{
        type: DataTypes.INTEGER,
        allowNull:false,
        field:'person_id'
    },
    deleted:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false
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
},{tableName:'participants', timestamps:false });