import { DataTypes, Model } from 'sequelize';
import db from '../connections';

import { PersonDAO } from './person';
import { UserDAO } from './user';

export interface IPersonExtraEvaluation extends Model {
    id:number;
    personToBeEvaluate:number;
    evaluatorPersonId:number;
    committeeAudioUrl:string;
    createAt:string;
	updateAt:string;
}

export const PersonExtraEvaluationDAO = db.define<IPersonExtraEvaluation>('PersonExtraEvaluation', {
        id:{
            primaryKey:true,
            type: DataTypes.INTEGER,
            autoIncrement:true,
            field:'person_extra_evaluation_id'
        },
        personToBeEvaluate:{
            type: DataTypes.INTEGER,
            allowNull:false,
            field:'person_to_evaluate_id'
        },
        evaluatorPersonId:{
            type: DataTypes.INTEGER,
            allowNull:false,
            field:'evaluator_user_id'
        },
        committeeAudioUrl:{
            type:DataTypes.TEXT,
            allowNull:false,
            field:'committee_audio_url'
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
        tableName:'person_extra_evaluations', 
        timestamps:false 
    });

export const personExtraEvaluationAssociations = () => {

    PersonExtraEvaluationDAO.belongsTo(PersonDAO, {
        foreignKey:{
            name:'personToBeEvaluate',
            allowNull:false
        }
    });

    PersonExtraEvaluationDAO.belongsTo(UserDAO, {
        foreignKey:{
            name:'evaluatorPersonId',
            allowNull:false
        }
    });
};