import * as DataBaseModels from './models';



export const setAssociations = (): void => {
    
   for(let i=0; i < DataBaseModels.associations.length; i++) {
       DataBaseModels.associations[i]();
   }
}