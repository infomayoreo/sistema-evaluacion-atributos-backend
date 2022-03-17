import { DataTypes, Model, Sequelize } from 'sequelize';
import db from '../connections';
import { getNowUtc } from '../utils/db-utc-date';
import { ProficiencyRangeDAO } from './ProficiencyRange';

export interface IProficiencyValue extends Model {
    id:number;
    name:string,
    color?:string;
    numericValue:number;
    description?:string;
    activate:boolean;
    createAt:string;
	updateAt:string;
}

export const ProficiencyValueDAO = db.define<IProficiencyValue>('ProficiencyValue', {
        id:{
            primaryKey:true,
            type: DataTypes.INTEGER,
            autoIncrement:true,
            field:'proficiency_value_id'
        },
        name:{
            type:DataTypes.CHAR(100),
            allowNull:false,
            unique:true
        },
        description:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        color:{
            type:DataTypes.CHAR(8),
            allowNull:true,        
        },
        numericValue:{
            type:DataTypes.INTEGER,
            allowNull:false,
            field:'numeric_value'
        },
        activate:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:true
        },
        createAt:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: getNowUtc(),
            field:'create_at'
        },
        updateAt:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: getNowUtc(),
            field:'update_at'
        }
    } ,
    { 
        tableName:'profiencies_values',
        timestamps:false 
    }
);

export const profiencyValueAssociations = () => {

    ProficiencyValueDAO.hasMany(ProficiencyRangeDAO,{
        foreignKey: {
            name:'proficiencyValueId',
            allowNull: false
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });
};