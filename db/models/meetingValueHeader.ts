import { DataTypes, Model, Sequelize } from 'sequelize';
import db from '../connections';

import { MeetingValueDetailDAO } from './meetingValueDetail';
import { ParticipantDAO } from './participant';

export interface IMeetingValueHeader extends Model {
    id:number;
    participantEvaluatorId:number;
    generalFeedback?:string;
    createAt:string;
	updateAt:string;
}

export const MeetingValueHeaderDAO = db.define<IMeetingValueHeader>('meetingValueHeader', {
        id:{
            primaryKey:true,
            type: DataTypes.INTEGER,
            autoIncrement:true,
            field:'meeting_value_header_id'
        },
        participantEvaluatorId:{
            type: DataTypes.INTEGER,
            field:'participant_evaluator_id',
            allowNull: false,
        },
        generalFeedback: {
            type:DataTypes.STRING,
            field:'general_feedback',
            allowNull:true
        },
        createAt:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue:Sequelize.literal('CURRENT_TIMESTAMP'),
            field:'create_at'
        },
        updateAt:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue:Sequelize.literal('CURRENT_TIMESTAMP'),
            field:'update_at'
        }
    },
    {
        tableName:'meeting_value_headers', 
        timestamps:false 
    });

export const meetingValueHeaderAssociations = () => {

    MeetingValueHeaderDAO.hasMany(MeetingValueDetailDAO,{
        foreignKey: {
            name:'meetingValueHeaderId',
            allowNull: false
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });

    MeetingValueHeaderDAO.belongsTo(ParticipantDAO, { 
        foreignKey: {
            name:'participantEvaluatorId',
            allowNull: false
        }
    });
};