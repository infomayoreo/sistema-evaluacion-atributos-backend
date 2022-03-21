import { DataTypes, Model, Sequelize } from 'sequelize';
import db from '../connections';

import { MeetingDAO } from './meeting';

export interface IMeetingPlatform extends Model {
    id:number;
    name:string;
    description?:string;
    activate:boolean;
    createAt:string;
	updateAt:string;
}

export const MeetingPlatformDAO = db.define<IMeetingPlatform>('MeetingPlatform', {
        id:{
            primaryKey:true,
            type: DataTypes.INTEGER,
            autoIncrement:true,
            field:'meeting_platform_id'
        },
        name: {
            type: DataTypes.CHAR(100),
            allowNull:false,
            unique:true,
        },
        description: {
            type:DataTypes.STRING,
            allowNull:true,
        },
        activate: {
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:true,
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
        tableName:'meeting_platforms',
        timestamps:false 
});

export const meetingPlatformAssociations = () => {

    MeetingPlatformDAO.hasMany(MeetingDAO, {
        foreignKey: {
            name:'meetingPlaformId',
            allowNull: false
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });

};