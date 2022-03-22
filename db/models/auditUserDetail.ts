import { DataTypes, Model, Sequelize } from 'sequelize';
import db from '../connections';

import { AuditUserHeaderDAO } from './auditUserHeader';

export interface IAuditUserDetail extends Model {
    id:number;
    auditUserId:number;
    atTable:string;
    atColumn:string;
    oldValue:string;
    newValue:string
    createAt:string;
	updateAt:string;
}

export const AuditUserDetailDAO = db.define<IAuditUserDetail>('auditUserDetail', {
        id:{
            primaryKey:true,
            type: DataTypes.INTEGER,
            autoIncrement:true,
            field:'audit_user_detail_id'
        },
        auditUserId:{
            type:DataTypes.INTEGER,
            allowNull:false,
            field:'audit_user_header_id'
        },
        atTable:{
            type:DataTypes.CHAR(100),
            field:'at_table',
            allowNull:false
        },
        atColumn:{
            type:DataTypes.CHAR(100),
            field:'at_column',
            allowNull:false
        },
        oldValue:{
            type:DataTypes.STRING,
            field:'old_value',
            allowNull:false
        },
        newValue:{
            type:DataTypes.STRING,
            field:'new_value',
            allowNull:false
        },
        dataType:{
            type:DataTypes.CHAR(100),
            field:'data_type',
            allowNull:false
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
        tableName:'audit_user_details', 
        timestamps:false 
    });

export const auditUserDetailsAssociations = () => {

    AuditUserDetailDAO.belongsTo(AuditUserHeaderDAO,{
        foreignKey: {
            name:'auditUserId',
            allowNull: false
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });
};