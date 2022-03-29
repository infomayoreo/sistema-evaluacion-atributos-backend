import { DataTypes, Model, Sequelize } from 'sequelize';
import db from '../connections';

import { AuditUserDetailDAO } from './auditUserDetail';
import { SystemAuditableProcessDAO } from './systemAuditableProcess';
import { UserDAO } from './user';

export interface IAuditUserHeader extends Model {
    id:number;
    auditableProcessId:number;
    userId:number;
    createAt:string;
	updateAt:string;
}

export const AuditUserHeaderDAO = db.define<IAuditUserHeader>('auditUserHeader', {
        id:{
            primaryKey:true,
            type: DataTypes.INTEGER,
            autoIncrement:true,
            field:'audit_user_header_id'
        },
        auditableProcessId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field:'system_auditable_process_id'
        },
        userId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            field:'user_id'
        },
        createAt:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue:Sequelize.literal('CURRENT_TIMESTAMP'),
            field:'create_at'
        },
        updateAt:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue:Sequelize.literal('CURRENT_TIMESTAMP'),
            field:'update_at'
        }
    }, 
    {
        tableName:'audit_user_headers', 
        timestamps:false 
    });

export const auditUserHeaderAssociations = () => {

    AuditUserHeaderDAO.hasMany(AuditUserDetailDAO,{
        foreignKey: {
            name:'auditUserId',
            allowNull: false
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });

    AuditUserHeaderDAO.belongsTo(UserDAO, { 
        foreignKey: {
            name:'userId',
            allowNull: false
        }
    });

    AuditUserHeaderDAO.belongsTo(SystemAuditableProcessDAO, { 
        foreignKey: {
            name:'auditableProcessId',
            allowNull: false
        }
    });
};