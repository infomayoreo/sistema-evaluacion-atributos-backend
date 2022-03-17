import { DataTypes, Model, Sequelize } from 'sequelize';
import db from '../connections';
import { getNowUtc } from '../utils/db-utc-date';
import { ProficiencyRangeDAO } from './ProficiencyRange';

export interface IProficiency extends Model {
    id:number;
    name:string,
    description?:string;
    activate:boolean;
    createAt:string;
	updateAt:string;
}

export const ProficiencyDAO = db.define<IProficiency>('Proficiency', {
        id:{
            primaryKey:true,
            type: DataTypes.INTEGER,
            autoIncrement:true,
            field:'proficiency_id'
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
    },
    { 
        tableName:'proficiencies',
        timestamps:false 
    });

export const profiencyAssociations = () => {

    ProficiencyDAO.hasMany(ProficiencyRangeDAO,{
        foreignKey:{
            name:'proficiencyId',
            allowNull:false
        },
        onDelete:'NO ACTION',
        onUpdate:'NO ACTION'
    });
};