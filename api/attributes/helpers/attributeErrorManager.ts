import {nextErrorNumber} from '../../../common/errorManager/AppCommonErrorCodes'

const attributeErrosCodes = {
  ATTRIBUTE_TYPE_ID_IS_NOT_NUMERIC:nextErrorNumber('ATTRIBUTE_TYPE_ID_IS_NOT_NUMERIC'),
  ATTRIBUTE_PROFILE_TYPE_ID_IS_NOT_NUMERIC:nextErrorNumber('ATTRIBUTE_PROFILE_TYPE_ID_IS_NOT_NUMERIC'),
  ATTRIBUTE_ID_IS_NOT_NUMERIC:nextErrorNumber('ATTRIBUTE_ID_IS_NOT_NUMERIC'),
  ATTRIBUTE_ID_NOT_VALID:nextErrorNumber('ATTRIBUTE_ID_NOT_VALID'),
  
} as const;

export {
    attributeErrosCodes 
}