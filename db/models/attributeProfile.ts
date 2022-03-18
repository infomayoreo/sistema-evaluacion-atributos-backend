import { DataTypes, Model } from 'sequelize';
import db from '../connections';
import { getNowUtc } from '../utils/db-utc-date';
import { AttributeDAO } from './attribute';
import { ProfileTypeDAO } from './profileType';

export interface IAttributeProfile extends Model {
    id:number;
    profileTypeId:number;
    attributeId:number;
    createAt:string;
	updateAt:string;
}

export const AttributeProfileDAO = db.define<IAttributeProfile>('AttributeProfile', {
        id:{
            primaryKey:true,
            type: DataTypes.INTEGER,
            autoIncrement:true,
            field:'profile_type_id'
        },
        profileTypeId:{
            type:DataTypes.INTEGER,
            field:'profile_type_id',
            allowNull:false
        },
        attributeId:{
            type:DataTypes.INTEGER,
            field:'attribute_id',
            allowNull:false
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
            defaultValue: getNowUtc(),
            field:'update_at'
        }
    } ,
    { 
        tableName:'attribute_profiles',
        timestamps:false,
        indexes:[
            {
                unique:true,
                fields:['profile_type_id','attribute_id'],
            }
        ]
    }
);

export const attributeProfileAssociations = () => {
    
    AttributeProfileDAO.belongsTo (AttributeDAO, { 
        foreignKey: {
            name:'attributeId',
            allowNull: false
        }
    });

    AttributeProfileDAO.belongsTo(ProfileTypeDAO,{
        foreignKey: {
            name:'profileTypeId',
            allowNull: false
        }
    });
};

