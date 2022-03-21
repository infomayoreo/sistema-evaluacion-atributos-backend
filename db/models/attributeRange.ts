import { DataTypes, Model } from 'sequelize';
import db from '../connections';

import { AttributeDAO } from './attribute';
import { AttributeValueDAO } from './attributeValue';
import { MeetingValueDetailDAO } from './meetingValueDetail';
import { PersonValueDetailDAO } from './personValueDetails';

export interface IAttributeRange extends Model {
    id:number;
    attributeId:number;
    attributeValueId:number;
    createAt:string;
	updateAt:string;
}


export const AttributeRangeDAO = db.define<IAttributeRange>('AttributeRange', {
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
            defaultValue:DataTypes.NOW,
            field:'create_at'
        },
        updateAt:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue:DataTypes.NOW,
            field:'update_at'
        }
    },
    {
        tableName:'attribute_ranges',
        timestamps:false,
        indexes:[
            {
                unique:true,
                fields:['attribute_id','value_id'],
            }
        ] 
    }
);

export const attributeRangeAssociations = () => {
    
    AttributeRangeDAO.hasMany(PersonValueDetailDAO, {
        foreignKey: {
            name:'valueRangeId',
            allowNull: false
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });

    AttributeRangeDAO.hasMany(MeetingValueDetailDAO, {
        foreignKey: {
            name:'valueRangeId',
            allowNull: false
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });

    AttributeRangeDAO.belongsTo(AttributeValueDAO,{
        foreignKey:{
            name:'attributeValueId',
            allowNull:false,
        }
    });

    AttributeRangeDAO.belongsTo(AttributeDAO,{
        foreignKey:{
            name:'attributeId',
            allowNull:false,
        }
    });
};