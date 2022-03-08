import { DataTypes, Model } from 'sequelize';
import db from '../connections';

export interface IRol extends Model {

}

export const RolDAO = db.define<IRol> ('Rol',{},{
    tableName: 'roles'
});

