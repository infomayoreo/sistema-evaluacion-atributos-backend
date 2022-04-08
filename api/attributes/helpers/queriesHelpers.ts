import { AttributeDAO, AttributeProfileDAO, AttributeRangeDAO, AttributeTypeDAO, AttributeValueDAO, ProfileTypeDAO } from '../../../db/models';

export const whereCondtionAttributeById = (attributeId:number) =>{

    return {
            id:attributeId,
            activate:true
        };
}

export const whereCondtionAttributeByType = (attributeTypeId?:number) => {

    const whereCondition = attributeTypeId? { activate:true, attributeTypeId:Number(attributeTypeId)}:{ activate:true };
    return whereCondition;
}

export const whereCondtionAttributeByProfile = (attributeTypeId?:number) => {

    const whereCondition = attributeTypeId? { activate:true, attributeTypeId:Number(attributeTypeId)}:{ activate:true };
    return whereCondition;
}


export const getAttributes = () => {
    
    const query = {
        
        attributes:{
            exclude:['createAt','updateAt','activate']
        },
        include:[{
            model:AttributeTypeDAO,
            attributes:{
                exclude:['createAt','updateAt','activate']
            }
        },
        {
            model:AttributeRangeDAO,
            where:{activate:true},
            separate:true,
            attributes:{
                exclude:['createAt','updateAt','activate']
            },                   
            include:[{
                model:AttributeValueDAO,
                attributes:{
                    exclude:['createAt','updateAt']
                }
            }],
        },
        {
            model:AttributeProfileDAO,
            where:{activate:true},
            separate:true,
            attributes:{
                exclude:['createAt','updateAt','activate']
            },                   
            include:[{
                model:ProfileTypeDAO,
                attributes:{
                    exclude:['createAt','updateAt']
                }
            }],
        }]
    };

    return query;
}

