import { DataTypes, Model } from 'sequelize';
import db from '../connections';
import { getNowUtc } from '../utils/db-utc-date';

export interface IAttributeRange extends Model {
    id:number;
    attributeId:number;
    attributeValueId:number;
    createAt:string;
	updateAt:string;
}


export const AttributeRangeDAO = db.define<IAttributeRange>('attributeRange', {
        id:{
            primaryKey:true,
            type: DataTypes.INTEGER,
            autoIncrement:true,
            field:'attribute_range_id'
        },
        attributeId:{
            
            type: DataTypes.INTEGER,
            field:'attribute_id',
            allowNull: false,
        },
        attributeValueId:{
            
            type: DataTypes.INTEGER,
            field:'value_id',
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
        tableName:'attribute_ranges',
        timestamps:false 
    }
);