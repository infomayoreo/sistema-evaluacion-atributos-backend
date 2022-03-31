import { IUser, LevelAccessDAO, PersonDAO } from '../../../db/models';

export const userAditionalData = {
  attributes:{
    exclude:['googleId','password','createAt','updateAt','activate']
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
 