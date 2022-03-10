import { DataTypes, Model } from 'sequelize';
import db from '../connections';
import { getNowUtc } from '../utils/db-utc-date';

export interface IMeetingValueDetail extends Model {
    id:number;
    meetingValueHeaderId:number;
    participantWithPermissionsToEvalMeetingAttributeId:number;
    valueRangeId:number;
    createAt:string;
	updateAt:string;
}

export const MeetingValueDetailDAO = db.define<IMeetingValueDetail>('MeetingValueDetail', {
    id:{
        primaryKey:true,
        type: DataTypes.INTEGER,
        autoIncrement:true,
        field:'meeting_value_detail_id'
    },
    meetingValueHeaderId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        field:'meeting_value_header_id'
    },
    participantWithPermissionsToEvalMeetingAttributeId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        field:'participant_with_permissions_to_eval_meeting_attribute_id'
    },
    valueRangeId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        field:'value_range_id'
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
},{tableName:'meeting_value_details', timestamps:false })