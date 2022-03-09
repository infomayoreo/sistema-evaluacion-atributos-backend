import { DataTypes, Model } from 'sequelize';
import db from '../connections';
import { getNowUtc } from '../utils/db-utc-date';

export interface IUser extends Model {
	id: string;
	name: string;
	email: string;
	password: string;
	status: number;
	createAt:string;
	updateAt:string;
}

export const UserDAO = db.define<IUser>('User', {
		id: {
			primaryKey: true,
			type: DataTypes.INTEGER,
            autoIncrement:true,
            field:'user_id'
		},
		rolId : {
			allowNull: false,
			type: DataTypes.INTEGER,
			field: 'rol_id'
		},
		name: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		email: {
			allowNull: false,
			type: DataTypes.STRING,
			unique: true
		},
		password: {
			allowNull: false,
			type: DataTypes.STRING
		},
		status: {
			allowNull: false,
			type: DataTypes.TINYINT,
			defaultValue: 1
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
		tableName: 'users',
		timestamps:false 
	}
);
