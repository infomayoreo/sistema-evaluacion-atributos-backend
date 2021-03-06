import { DataTypes, Model, Sequelize } from 'sequelize';
import db from '../connections';

import { MeetingDAO } from './meeting';
import { MeetingValueHeaderDAO } from './meetingValueHeader';
import { PersonDAO } from './person';

export interface IParticipant extends Model {
    id:number;
    meetingId:number;
    personId:number;
    deleted:boolean;
    createAt:string;
	updateAt:string;
}

export const ParticipantDAO = db.define('participant', {
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
            type: 'TIMESTAMP',
            allowNull: false,
            defaultValue:Sequelize.literal('CURRENT_TIMESTAMP'),
            field:'create_at'
        },
        updateAt:{
            type: 'TIMESTAMP',
            allowNull: false,
            defaultValue:Sequelize.literal('CURRENT_TIMESTAMP'),
            field:'update_at'
        }
    },
    {
        tableName:'participants', 
        timestamps:false 
    });

export const participantAssociations = () => {
    
    ParticipantDAO.hasMany(MeetingValueHeaderDAO, {
        foreignKey: {
            name:'participantEvaluatorId',
            allowNull: false
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });

    ParticipantDAO.belongsTo(MeetingDAO, { 
        foreignKey: {
            name:'meetingId',
            allowNull: false
        }
    });

    ParticipantDAO.belongsTo(PersonDAO, { 
        foreignKey: {
            name:'personId',
            allowNull: false
        }
    });
};