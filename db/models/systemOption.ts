import { DataTypes, Model } from 'sequelize'
import db from '../connections';
import { getNowUtc } from '../utils/db-utc-date';

export interface ISystemOption extends Model {
    id:number;
    createAt:string;
	updateAt:string;
}

export const SystemOptionDAO = db.define<ISystemOption>('SystemOption', {
    id:{
        primaryKey:true,
        type: DataTypes.INTEGER,
        autoIncrement:true,
        field:'system_option_id'
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
},{ tableName:'system_options', timestamps:false });