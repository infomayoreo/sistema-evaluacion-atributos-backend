import { DataTypes, Model } from 'sequelize';
import db from '../connections';

export interface IAttributeType extends Model {

}

export const AttributeTypeDAO = db.define<IAttributeType>('AttributeType',{},{tableName:'attribute_types'});