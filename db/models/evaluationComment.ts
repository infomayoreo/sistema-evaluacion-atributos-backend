import { DataTypes, Model } from 'sequelize';
import db from '../connections';
import { getNowUtc } from '../utils/db-utc-date';
import { PersonDAO } from './person';
import { UserDAO } from './user';

export interface IEvaluationComment extends Model {
    id:number;
    personToBeEvaluate:number;
    evaluatorUserId:number;
    comment:string;
    createAt:string;
	updateAt:string;
}

export const EvaluationCommentDAO = db.define<IEvaluationComment>('EvaluationComment', {
        id:{
            primaryKey:true,
            type: DataTypes.INTEGER,
            autoIncrement:true,
            field:'evaluation_comment_id'
        },
        personToBeEvaluate:{
            type: DataTypes.INTEGER,
            allowNull:false,
            field:'person_to_evaluate_id'
        },
        evaluatorUserId:{
            type: DataTypes.INTEGER,
            allowNull:false,
            field:'evaluator_user_id'
        },
        comment:{
            type:DataTypes.TEXT,
            allowNull:false,        
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
        tableName:'evaluation_comments', 
        timestamps:false 
    });

export const evaluationCommentAssociations = () => {
    
    EvaluationCommentDAO.belongsTo(PersonDAO, { 
        foreignKey: {
            name:'personToBeEvaluate',
            allowNull: false
        }
    });
    EvaluationCommentDAO.belongsTo(UserDAO, { 
        foreignKey: {
            name:'evaluatorUserId',
            allowNull: false
        }
    });
};