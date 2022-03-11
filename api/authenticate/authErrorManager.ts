import * as CommonErrorManager from '../../common/errorManager/AppCommonErrorCodes'

const authErrosCodes = {
    NOT_VALID_USER:CommonErrorManager.nextErrorNumber('AUTH_NOT_VALID_USER'),
    AUTH_NOT_VALID_GOOGLE_TOKEN:CommonErrorManager.nextErrorNumber('AUTH_NOT_VALID_GOOGLE_TOKEN'),
}

export {
    authErrosCodes
}