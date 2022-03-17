import { DataTypes, Model } from 'sequelize';
import db from '../connections';
import { getNowUtc } from '../utils/db-utc-date';

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
                fields:['name','attributeTypeId'],
            }
        ]
    }
);

