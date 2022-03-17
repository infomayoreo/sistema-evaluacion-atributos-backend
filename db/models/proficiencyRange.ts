import { DataTypes, Model } from 'sequelize';
import db from '../connections';
import { getNowUtc } from '../utils/db-utc-date';

export interface IProficiencyRange extends Model {
    id:number;
    attributeId:number;
    proficiencyValueId:number;
    createAt:string;
	updateAt:string;
}


export const ProficiencyRangeDAO = db.define<IProficiencyRange>('ProficiencyRange', {
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
        tableName:'proficiencies_ranges',
        timestamps:false,
        indexes:[
            {
                unique:true,
                fields:['proficiencyId','proficiencyValueId'],
            }
        ] 
    }
);