import { DataTypes, Model, Sequelize } from 'sequelize';
import db from '../connections';

import { AttributeRangeDAO } from './attributeRange';
import { MeetingValueHeaderDAO } from './meetingValueHeader';

export interface IMeetingValueDetail extends Model {
    id:number;
    meetingValueHeaderId:number;
    valueRangeId:number;
    feedback?:string;
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
        valueRangeId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            field:'value_range_id'
        },
        feedback:{
            type:DataTypes.STRING,
            allowNull:true,
            field:'attribute_feedbak'
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
        tableName:'meeting_value_details', 
        timestamps:false 
});


export const meetingValueDetailAssociations = () => {

    MeetingValueDetailDAO.belongsTo(MeetingValueHeaderDAO, { 
        foreignKey: {
            name:'meetingValueHeaderId',
            allowNull: false
        }
    });

    MeetingValueDetailDAO.belongsTo(AttributeRangeDAO, { 
        foreignKey: {
            name:'valueRangeId',
            allowNull: false
        }
    });
};
