import { DataTypes, Model, Sequelize } from 'sequelize';
import db from '../connections';
import { getNowUtc } from '../utils/db-utc-date';

export interface IAttribute extends Model {
    id:number;
    attributeTypeId:number;
    createAt:string;
	updateAt:string;
}

export const AttributeDAO = db.define<IAttribute>('attribute', {
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
        timestamps:false 
    }
);

