import { DataTypes, Model } from 'sequelize';
import db from '../connections';

export interface IAttributeValue extends Model {

}

export const AttributeValueDAO = db.define<IAttributeValue>('AttributeValue',{},{tableName:'attribute_value'});