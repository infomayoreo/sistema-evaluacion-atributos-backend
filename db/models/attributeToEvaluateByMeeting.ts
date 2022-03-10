import { DataTypes, Model } from 'sequelize';
import db from '../connections';
import { getNowUtc } from '../utils/db-utc-date';



/**  is the attribute that going to be evaluate in a specifit meeting */
export interface IAttributeToEvaluteByMeeting extends Model {
    id:number;
    createAt:string;
    meetingId:number;
    attributeId:number;
	updateAt:string;
}

export const AttributeToEvaluteByMeetingDAO = db.define<IAttributeToEvaluteByMeeting>('AttributeToEvaluteByMeeting', {
    id:{
        primaryKey:true,
        type: DataTypes.INTEGER,
        autoIncrement:true,
        field:'attribute_evalute_meeting_id'
    },
    meetingId:{
        type: DataTypes.INTEGER,
        field:'meeting_id', 
        allowNull: false,
    },
    attributeId:{
            
        type: DataTypes.INTEGER,
        field:'attribute_id',
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
},{tableName:'attributes_to_evaluate_by_meeting',timestamps:false });