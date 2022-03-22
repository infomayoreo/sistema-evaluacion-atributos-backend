import { DataTypes, Model, Sequelize } from 'sequelize';
import db from '../connections';

import { PersonProficiencyDAO } from './personProficiency';
import { ProficiencyDAO } from './proficiency';
import { ProficiencyValueDAO } from './proficiencyValue';

export interface IProficiencyRange extends Model {
    id:number;
    attributeId:number;
    proficiencyValueId:number;
    createAt:string;
	updateAt:string;
}


export const ProficiencyRangeDAO = db.define<IProficiencyRange>('proficiencyRange', {
        id:{
            primaryKey:true,
            type: DataTypes.INTEGER,
            autoIncrement:true,
            field:'proficiency_range_id'
        },
        proficiencyId:{
            type: DataTypes.INTEGER,
            field:'proficiency_id',
            allowNull: false,
        },
        proficiencyValueId:{
            type: DataTypes.INTEGER,
            field:'proficiency_value_id',
            allowNull: false,
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
        tableName:'proficiencies_ranges',
        timestamps:false,
        indexes:[
            {
                unique:true,
                fields:['proficiency_id','proficiency_value_id'],
            }
        ] 
    }
);

export const profiencyRangeAssociations = () => {

    ProficiencyRangeDAO.hasMany(PersonProficiencyDAO, {
        foreignKey:{
            allowNull:false,
            name:'valueRangeId'
        },
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });

    ProficiencyRangeDAO.belongsTo(ProficiencyDAO,{
        foreignKey:{
            name:'proficiencyId',
            allowNull:false
        }
    });

    ProficiencyRangeDAO.belongsTo(ProficiencyValueDAO,{
        foreignKey:{
            name:'proficiencyValueId',
            allowNull:false
        }
    });
};