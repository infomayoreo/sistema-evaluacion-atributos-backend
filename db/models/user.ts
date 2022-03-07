import { DataTypes, Model } from 'sequelize';
import db from '../connections';

export interface UserInstance extends Model {
	uid: string;
	name: string;
	email: string;
	password: string;
	status: number;
}

export const User = db.define<UserInstance>('User', {
	uid: {
		primaryKey: true,
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4
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
}, {
	tableName: 'users'
});
