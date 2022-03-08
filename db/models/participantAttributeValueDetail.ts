import { DataTypes, Model } from 'sequelize';
import db from '../connections';
import { getNowUtc } from '../utils/db-utc-date';

export interface IParticipantAttributeValueDetail extends Model {
    id:number;
    createAt:string;
	updateAt:string;
}

export const ParticipantAttributeValueDetailDAO = db.define<IParticipantAttributeValueDetail>('ParticipantAttributeValueDetail', {
    id:{
        primaryKey:true,
        type: DataTypes.INTEGER,
        autoIncrement:true,
        field:'participant_attribute_value_detail_id'
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
},{
    
    tableName:'participant_attribute_values_details', 
    timestamps:false 
});