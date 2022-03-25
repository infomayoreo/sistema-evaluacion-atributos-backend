import {nextErrorNumber} from '../../../common/errorManager/AppCommonErrorCodes'

const attributeErrosCodes = {
  ATTRIBUTE_TYPE_ID_IS_NOT_NUMERIC:nextErrorNumber('ATTRIBUTE_TYPE_ID_IS_NOT_NUMERIC'),
} as const;

export {
    attributeErrosCodes 
}