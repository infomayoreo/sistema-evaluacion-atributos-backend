import DataBaseModels from './index';
import { AttributeDAO, AttributeTypeDAO } from './models';


export const setAssociations = (): void => {
    // TODO: Set all database associations

    AttributeTypeDAO.hasMany(AttributeDAO, { foreignKey: {
        name:'attributeTypeId',
        allowNull: false
      }, onDelete: 'NO ACTION', onUpdate: 'NO ACTION'});
    AttributeDAO.belongsTo (AttributeTypeDAO, { foreignKey:'attributeTypeId'});

};
