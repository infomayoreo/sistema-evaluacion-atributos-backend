import { DataTypes, Model, Sequelize } from 'sequelize';
import db from '../connections';

import { AuditUserHeaderDAO } from './auditUserHeader';
import { EvaluationCommentDAO } from './evaluationComment';
import { LevelAccessDAO } from './levelAccess';
import { MeetingDAO } from './meeting';
import { PermissionByUserDAO } from './permissionByUser';
import { PersonDAO } from './person';
import { PersonExtraEvaluationDAO } from './personExtraEvaluation';
import { PersonValueHeaderDAO } from './personValueHeader';

export interface IUser extends Model {
	id: number;
	levelAccessId:number;
	name: string;
	email: string;
	password: string;
	activate: number;
	createAt:string;
	updateAt:string;
}

export const UserDAO = db.define<IUser>('user', {
		id: {
			primaryKey: true,
			type: DataTypes.INTEGER,
            autoIncrement:true,
            field:'user_id'
		},
		levelAccessId : {
			allowNull: false,
			type: DataTypes.INTEGER,
			field: 'level_access_id'
		},
		email: {
			allowNull: false,
			type: DataTypes.STRING,
			unique: true,
			set (value:string ){
				this.setDataValue('email',value.toUpperCase());
			},
			get(){
				return this.getDataValue('email').toUpperCase();
			}
		},
		password: {
			allowNull: false,
			type: DataTypes.STRING
		},
		activate: {
			allowNull: false,
			type: DataTypes.BOOLEAN,
			defaultValue: true
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
		tableName: 'users',
		timestamps:false
	}
);


export const userAssociations = () => {

	UserDAO.belongsTo(LevelAccessDAO,{
		foreignKey:{
			name:'levelAccessId',
			allowNull:false,
		},
		
	});

	UserDAO.hasOne(PersonDAO,{
		foreignKey:{
			name:'userId',
			allowNull:true,
		},
		onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
	});

	UserDAO.hasMany(PersonExtraEvaluationDAO, {
		foreignKey:{
			name:'evaluatorPersonId',
			allowNull:false,
		},
		onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
	});
	UserDAO.hasMany(EvaluationCommentDAO, {
		foreignKey:{
			name:'evaluatorUserId',
			allowNull:false
		},
		onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
	});
	UserDAO.hasMany(AuditUserHeaderDAO, {
		foreignKey:{
			name:'userId',
			allowNull:false,
		},
		onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
	});
	UserDAO.hasMany(PersonValueHeaderDAO, {
		foreignKey:{
			name:'evaluatorUserId',
			allowNull:false
		},
		onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
	});
	UserDAO.hasMany(PermissionByUserDAO, {
		foreignKey:{
			name:'userId',
			allowNull:false
		},
		onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
	});
	UserDAO.hasMany(MeetingDAO,{
		foreignKey:{
			name:'createByUserId',
			allowNull:false
		}
	});
};