import { DataTypes, Model } from 'sequelize';
import db from '../connections';
import { getNowUtc } from '../utils/db-utc-date';

export interface IMeetingValueHeader extends Model {
    id:number;
    participantId:number;
    createAt:string;
	updateAt:string;
}

export const MeetingValueHeaderDAO = db.define<IMeetingValueHeader>('MeetingValueHeader', {
    id:{
        primaryKey:true,
        type: DataTypes.INTEGER,
        autoIncrement:true,
        field:'meeting_value_header_id'
    },
    participantId:{
        type: DataTypes.INTEGER,
        field:'participant_id',
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
},{tableName:'meeting_value_headers', timestamps:false });