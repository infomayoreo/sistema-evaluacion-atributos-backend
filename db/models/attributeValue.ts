import { DataTypes, Model, Sequelize } from 'sequelize';
import db from '../connections';

import { AttributeRangeDAO } from './attributeRange';

export interface IAttributeValue extends Model {
    id:number;
    name:string;
    numericValue:number;
    description?:string;
    color?:string;
    activate:boolean;
    createAt:string;
	updateAt:string;
}

export const AttributeValueDAO = db.define<IAttributeValue>('AttributeValue', {
        id:{
            primaryKey:true,
            type: DataTypes.INTEGER,
            autoIncrement:true,
            field:'attribute_range_id'
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
            defaultValue:true,
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
        tableName:'attribute_value',
         timestamps:false 
    });

export const attributeValueAssociations = () => {

    AttributeValueDAO.hasMany(AttributeRangeDAO, {
        foreignKey: {
            name:'attributeValueId',
            allowNull: false
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });
};