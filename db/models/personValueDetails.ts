import { DataTypes, Model, Sequelize } from 'sequelize';
import db from '../connections';

import { AttributeRangeDAO } from './attributeRange';
import { PersonValueHeaderDAO } from './personValueHeader';


export interface IPersonValueDetail extends Model {
    id:number;
    personValueHeaderId:number;
    valueRangeId:number;
    feedback?:string;
    createAt:string;
	updateAt:string;
}

export const PersonValueDetailDAO = db.define<IPersonValueDetail>('personValueDetail', {
        id:{
            primaryKey:true,
            type: DataTypes.INTEGER,
            autoIncrement:true,
            field:'person_value_detail_id'
        },
        personValueHeaderId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            field:'person_value_header_id'
        },
        valueRangeId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            field:'value_range_id'
        },
        feedback:{
            type: DataTypes.STRING,
            field:'attribute_feedbak',
            allowNull: true,
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
        tableName:'person_values_details', 
        timestamps:false 
    });

export const personValueDetailAssociations = () => {

    PersonValueDetailDAO.belongsTo(PersonValueHeaderDAO, {
        foreignKey: {
            allowNull:false,
            name:'personValueHeaderId'
        }
    });

    PersonValueDetailDAO.belongsTo(AttributeRangeDAO,{
        foreignKey:{
            name:'valueRangeId',
            allowNull:false
        }
    });
};