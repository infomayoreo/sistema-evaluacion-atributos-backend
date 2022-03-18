import { DataTypes, Model } from 'sequelize';
import db from '../connections';
import { getNowUtc } from '../utils/db-utc-date';
import { AttributeTypeDAO } from './attributeType';
import { AttributeRangeDAO } from './attributeRange';
import { AttributeProfileDAO } from './attributeProfile';

export interface IAttribute extends Model {
    id:number;
    name:string;
    description?:string;
    activate:boolean;
    attributeTypeId:number;
    createAt:string;
	updateAt:string;
}

export const AttributeDAO = db.define<IAttribute>('Attribute', {
        id:{
            primaryKey:true,
            type: DataTypes.INTEGER,
            autoIncrement:true,
            field:'attribute_id'
        },
        attributeTypeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field:'attribute_type_id'
        },
        name:{
            type:DataTypes.CHAR(100),
            allowNull:false            
        },
        description:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        activate: {
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
        tableName:'attributes',
        timestamps:false ,
        indexes:[
            {
                unique:true,
                fields:['name','attribute_type_id'],
            }
        ]
    }
);

export const attributeAssociations = ():void => {
   
    AttributeDAO.hasMany(AttributeRangeDAO, {
        foreignKey: {
            name:'attributeId',
            allowNull: false
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });

    AttributeDAO.hasMany(AttributeProfileDAO, {
        foreignKey: {
            name:'attributeId',
            allowNull: false
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });

    AttributeDAO.belongsTo (AttributeTypeDAO, { 
        foreignKey: {
            name:'attributeTypeId',
            allowNull: false
        }
    });
    
};
