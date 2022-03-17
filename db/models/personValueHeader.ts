import { DataTypes, Model } from 'sequelize';
import db from '../connections';
import { getNowUtc } from '../utils/db-utc-date';

export interface IPersonValueHeader extends Model {
    id:number;
    evaluatorUserId:number;
    personToEvaluateId:number;
    evaluationType:number;
    meetingId:number;
    feedback?:string;
    createAt:string;
	updateAt:string;
}

export const PersonValueHeaderDAO = db.define<IPersonValueHeader>('PersonValueHeader', {
    id:{
        primaryKey:true,
        type: DataTypes.INTEGER,
        autoIncrement:true,
        field:'person_value_header_id'
    },
    evaluatorUserId:{
        type: DataTypes.INTEGER,
        field:'evaluator_user_id',
        allowNull: false,
    },
    personToEvaluateId:{
        type: DataTypes.INTEGER,
        field:'person_to_evaluate_id',
        allowNull: false,
    },
    evaluationType:{
        type: DataTypes.INTEGER,
        field:'evaluation_type_id',
        allowNull: false,
    },
    meetingId:{
        type: DataTypes.INTEGER,
        field:'meeting_id',
        allowNull: true,
    },
    feedback:{
        type: DataTypes.STRING,
        field:'general_feedback',
        allowNull: true,
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
},{tableName:'person_value_headers', timestamps:false });