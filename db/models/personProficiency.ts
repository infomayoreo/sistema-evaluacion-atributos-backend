import { DataTypes, Model } from 'sequelize';
import db from '../connections';
import { getNowUtc } from '../utils/db-utc-date';
import { PersonDAO } from './person';
import { ProficiencyRangeDAO } from './ProficiencyRange';

export interface IPersonProficiency extends Model {
    id:number;
    personId:number;
    valueRangeId:number;
    createAt:string;
	updateAt:string;
}

export const PersonProficiencyDAO = db.define<IPersonProficiency>('PersonProficiency', {
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
        tableName:'person_proficiencies', 
        timestamps:false, 
        indexes:[
            {
                unique:true,
                fields:['personId','valueRangeId'],
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