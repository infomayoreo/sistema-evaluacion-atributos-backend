import { DataTypes, Model, Sequelize } from 'sequelize';
import db from '../connections';

import { AttributeProfileDAO } from './attributeProfile';

export interface IProfileType extends Model {
    id:number;
    name:string,
    activate:boolean;
    description?:string;
    createAt:string;
	updateAt:string;
}

export const ProfileTypeDAO = db.define<IProfileType>('profileType', {
        id:{
            primaryKey:true,
            type: DataTypes.INTEGER,
            autoIncrement:true,
            field:'profile_type_id'
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
        activate: {
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:true
        },
        createAt:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            field:'create_at'
        },
        updateAt:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            field:'update_at'
        }
    } ,
    { 
        tableName:'profile_types',
        timestamps:false 
    }
);

export const profileTyeAssociations = () => {

    ProfileTypeDAO.hasMany(AttributeProfileDAO, {
        foreignKey: {
            name:'profileTypeId',
            allowNull: false
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });
};

