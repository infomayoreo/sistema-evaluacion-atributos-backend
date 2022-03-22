import { DataTypes, Model, Sequelize } from 'sequelize';
import db from '../connections';

import { DataSourceDAO } from './dataSource';
import { EvaluationCommentDAO } from './evaluationComment';
import { ParticipantDAO } from './participant';
import { PersonExtraEvaluationDAO } from './personExtraEvaluation';
import { PersonProficiencyDAO } from './personProficiency';
import { PersonValueHeaderDAO } from './personValueHeader';
import { UserDAO } from './user';

export interface IPerson extends Model {
    id:number;
    userId:number;
    dataSourceId:number;
    createAt:string;
	updateAt:string;
}

export const PersonDAO = db.define<IPerson>('person', {
        id:{
            primaryKey:true,
            type: DataTypes.INTEGER,
            autoIncrement:true,
            field:'person_id'
        },
        userId:{
            type: DataTypes.INTEGER,
            allowNull: true, 
            unique:true,
            field:'user_id'
        },
        dataSourceId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            field:'data_source_id'
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
        tableName:'persons', 
        timestamps:false 
    });

export const personAssociations = () => {
    
    PersonDAO.belongsTo(UserDAO, {
        foreignKey: {
            allowNull:true,
            name:'userId'
        }
    });

    PersonDAO.belongsTo(DataSourceDAO, {
        foreignKey: {
            allowNull:false,
            name:'dataSourceId'
        }
    });
    
    PersonDAO.hasMany(EvaluationCommentDAO, {
        foreignKey: {
            name:'personToBeEvaluate',
            allowNull: false
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });

    PersonDAO.hasMany(PersonProficiencyDAO, {
        foreignKey: {
            name:'personId',
            allowNull: false
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });

    PersonDAO.hasMany(ParticipantDAO, {
        foreignKey: {
            name:'personId',
            allowNull: false
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });

    PersonDAO.hasMany(PersonExtraEvaluationDAO, {
        foreignKey: {
            name:'personToBeEvaluate',
            allowNull: false
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });

    PersonDAO.hasMany(PersonValueHeaderDAO, {
        foreignKey: {
            name:'personToEvaluateId',
            allowNull: false
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });
};