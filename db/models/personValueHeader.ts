import { DataTypes, Model } from 'sequelize';
import db from '../connections';

import { EvaluationTypeDAO } from './evaluationType';
import { MeetingDAO } from './meeting';
import { PersonDAO } from './person';
import { PersonValueDetailDAO } from './personValueDetails';
import { UserDAO } from './user';

export interface IPersonValueHeader extends Model {
    id:number;
    evaluatorUserId:number;
    personToEvaluateId:number;
    evaluationTypeId:number;
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
        evaluationTypeId:{
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
            defaultValue:DataTypes.NOW,
            field:'create_at'
        },
        updateAt:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue:DataTypes.NOW,
            field:'update_at'
        }
    },
    {
        tableName:'person_value_headers', 
        timestamps:false 
    });

export const personValueHeaderAssociations = () => {
    
    PersonValueHeaderDAO.hasMany(PersonValueDetailDAO, {
        foreignKey: {
            name:'personValueHeaderId',
            allowNull: false
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });

    PersonValueHeaderDAO.belongsTo(EvaluationTypeDAO,{
        foreignKey:{
            name:'evaluationTypeId',
            allowNull:false
        }
    });

    PersonValueHeaderDAO.belongsTo(PersonDAO,{
        foreignKey:{
            name:'personToEvaluateId',
            allowNull:false
        }
    });

    PersonValueHeaderDAO.belongsTo(MeetingDAO,{
        foreignKey:{
            name:'meetingId',
            allowNull:true
        }
    });

    PersonValueHeaderDAO.belongsTo(UserDAO,{
        foreignKey:{
            name:'evaluatorUserId',
            allowNull:false
        }
    });
};