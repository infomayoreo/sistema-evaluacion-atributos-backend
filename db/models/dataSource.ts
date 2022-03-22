import { DataTypes, Model, Sequelize } from 'sequelize';
import db from '../connections';

import { PersonDAO } from './person';

export interface IDataSource extends Model {
    id:number;
    name:string;
    description:string;
    url?:string;
    activate:boolean;
    createAt:string;
	updateAt:string;
}


export const DataSourceDAO = db.define<IDataSource>('dataSource', {
        id:{
            primaryKey:true,
            type: DataTypes.INTEGER,
            autoIncrement:false,
            field:'data_source_id'
        },
        url:{
            type:DataTypes.STRING,
            allowNull:true,
            unique:false
        },
        name:{
            type:DataTypes.CHAR,
            allowNull:false,
            unique:false
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
        tableName:'data_sources', 
        timestamps:false
    });

export const dataSourceAssociations = () => {

        DataSourceDAO.hasMany(PersonDAO, {
            foreignKey: {
                name:'dataSourceId',
                allowNull: false
            }, 
            onDelete: 'NO ACTION', 
            onUpdate: 'NO ACTION'
        });
};