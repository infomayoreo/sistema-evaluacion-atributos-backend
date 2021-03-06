import { DataTypes, Model, Sequelize } from 'sequelize';
import db from '../connections';

import { PersonDAO } from './person';
import { ProficiencyRangeDAO } from './proficiencyRange';

export interface IPersonProficiency extends Model {
    id:number;
    personId:number;
    valueRangeId:number;
    createAt:string;
	updateAt:string;
}

export const PersonProficiencyDAO = db.define<IPersonProficiency>('personProficiency', {
        id:{
            primaryKey:true,
            type: DataTypes.INTEGER,
            autoIncrement:true,
            field:'proficiency_range_id'
        },
        personId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            field:'person_id'
        },
        valueRangeId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            field:'proficiency_range_id'
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
        tableName:'person_proficiencies', 
        timestamps:false, 
        indexes:[
            {
                unique:true,
                fields:['person_id','proficiency_range_id'],
            }
        ] 
    });

export const personProviciencyAssociations = () => {

    PersonProficiencyDAO.belongsTo(PersonDAO, {
        foreignKey:{
            name:'personId',
            allowNull:false
        }
    });
    
    PersonProficiencyDAO.belongsTo(ProficiencyRangeDAO, {
        foreignKey:{
            name:'valueRangeId',
            allowNull:false
        }
    });

};