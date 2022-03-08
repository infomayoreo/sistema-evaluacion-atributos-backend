import { DataTypes, Model } from 'sequelize';
import db from '../connections';

export interface IAttributeRange extends Model {

}

export const AttributeRangeDAO = db.define<IAttributeRange>('attributeRange',{},{tableName:'attribute_ranges'});