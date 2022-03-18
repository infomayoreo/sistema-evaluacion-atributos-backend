import { DataTypes, Model } from 'sequelize';
import db from '../connections';
import { getNowUtc } from '../utils/db-utc-date';
import { MeetingPlatformDAO } from './meetingPlatform';
import { ParticipantDAO } from './participant';
import { PersonValueHeaderDAO } from './personValueHeader';
import { UserDAO } from './user';

export interface IMeeting extends Model {
    id:number;
    createByUserId:number;
    meetingPlaformId:number;
    previusMeetingId:number;
    subject:string;
    meetUrl:string;
    deleted:boolean;
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
        subject:{
            type:DataTypes.CHAR(150),
            allowNull: false, 
        },
        meetUrl:{
            type:DataTypes.TEXT,
            allowNull:true,
            field:'meet_url'
        },
        deleted:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:false,
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
    },
    {
        tableName:'meetings', 
        timestamps:false 
});

export const meetingAssociations = () => {

    MeetingDAO.hasMany(MeetingDAO, {
        foreignKey: {
            name:'previusMeetingId',
            allowNull: true
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });

    MeetingDAO.hasMany(PersonValueHeaderDAO, {
        foreignKey: {
            name:'meetingId',
            allowNull: false
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });

    MeetingDAO.hasMany(ParticipantDAO,{
        foreignKey: {
            name:'meetingId',
            allowNull: false
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });

    MeetingDAO.belongsTo(MeetingDAO, { 
        foreignKey: {
            name:'previusMeetingId',
            allowNull: true
        }
    });

    MeetingDAO.belongsTo(MeetingPlatformDAO, { 
        foreignKey: {
            name:'meetingPlaformId',
            allowNull: false
        }
    });

    MeetingDAO.belongsTo(UserDAO, { 
        foreignKey: {
            name:'createByUserId',
            allowNull: false
        }
    });
};