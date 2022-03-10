import { DataTypes, Model } from 'sequelize';
import db from '../connections';
import { getNowUtc } from '../utils/db-utc-date';

export interface IMeeting extends Model {
    id:number;
    createByUserId:number;
    meetingPlaformId:number;
    previusMeetingId:number;
    personId:number;
    createAt:string;
	updateAt:string;
}

export const MeetingDAO = db.define<IMeeting>('Meeting', {
    id:{
        primaryKey:true,
        type: DataTypes.INTEGER,
        autoIncrement:true,
        field:'meeting_id'
    },
    createByUserId:{
        type: DataTypes.INTEGER,
        allowNull: false, 
        field:'created_by_user_id'
    },
    meetingPlaformId:{
        type: DataTypes.INTEGER,
        field:'meeting_platform_id'
    },
    previusMeetingId: {
        type: DataTypes.INTEGER,
        allowNull:true,
        field:'previus_meeting_id'
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
},{tableName:'meetings', timestamps:false });