import { DataTypes, Model, Sequelize } from 'sequelize';
import db from '../connections';

import { AttributeDAO } from './attribute';

export interface IAttributeType extends Model {
    id:number;
    name:string;
    description?:string;
    activate:boolean;
    createAt:string;
	updateAt:string;
}

export const AttributeTypeDAO = db.define<IAttributeType>('AttributeType', {
        id:{
            primaryKey:true,
            type: DataTypes.INTEGER,
            autoIncrement:false,
            field:'attribute_type_id'
        },
        name:{
            type: DataTypes.CHAR(100),
            allowNull:false,
            unique:true,
        },
        description:{
            type:DataTypes.STRING,
            allowNull:true,
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
    {   tableName:'attribute_types', 
        timestamps:false 
    });

export const attributeTypeAssociations = ():void => {
   
    AttributeTypeDAO.hasMany(AttributeDAO, { 
        foreignKey: {
            name:'attributeTypeId',
            allowNull: false
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });
    
} ;