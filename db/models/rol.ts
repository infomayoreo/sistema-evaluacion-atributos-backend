import { DataTypes, Model } from 'sequelize';
import db from '../connections';
import { getNowUtc } from '../utils/db-utc-date';

export interface IRol extends Model {
    id:number;
    createAt:string;
	updateAt:string;
}

export const RolDAO = db.define<IRol> ('Rol', {
    id:{
        primaryKey:true,
        type: DataTypes.INTEGER,
        autoIncrement:false,
        field:'rol_id'
    },
    createAt:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: getNowUtc(),
        field:'create_at'
    },
    updateAt:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue:getNowUtc(),
        field:'update_at'
    }
},{
    tableName: 'roles',
    timestamps:false 
});

