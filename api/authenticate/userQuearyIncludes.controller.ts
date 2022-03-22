import { LevelAccessDAO, PersonDAO } from '../../db/models';

export const userAditionalData = {
  attributes:{
    exclude:['password','createAt','updateAt','activate']
  },
  include:[{
    model:LevelAccessDAO,
    attributes:{
      exclude:['createAt','updateAt','activate']
    },
  },
  {
    model:PersonDAO,
    attributes:{
      exclude:['createAt','updateAt']
    },
  }]};

 