import { DataTypes, Model, Sequelize } from 'sequelize';
import db from '../connections';

import { AuditUserHeaderDAO } from './auditUserHeader';

export interface ISystemAuditableProcess extends Model {
    id:number;
    name:string;
    description?:string;
    createAt:string;
	updateAt:string;
}

export const SystemAuditableProcessDAO = db.define<ISystemAuditableProcess>('SystemAuditableProcess', {
        id:{
            primaryKey:true,
            type: DataTypes.INTEGER,
            autoIncrement:true,
            field:'auditable_process_id'
        },
        name:{
            type:DataTypes.CHAR(100),
            allowNull:false,
            unique:true,
        },
        description:{
            type:DataTypes.STRING,
            allowNull:true,  
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
        tableName:'system_auditable_process', 
        timestamps:false 
    });

export const systemAuditableProcessAssociations = () => {

    SystemAuditableProcessDAO.hasMany(AuditUserHeaderDAO, {
        foreignKey: {
            name:'auditableProcessId',
            allowNull: false
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });
};