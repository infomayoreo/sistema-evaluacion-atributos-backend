import * as CommonErrorManager from '../../common/errorManager/AppCommonErrorCodes'

const authErrosCodes = {
    AUTH_MISSING_TOKEN:CommonErrorManager.nextErrorNumber('AUTH_MISSING_TOKEN'),
    AUTH_NOT_VALID_USER:CommonErrorManager.nextErrorNumber('AUTH_NOT_VALID_USER'),
    AUTH_PASSWORD_REQUIRED:CommonErrorManager.nextErrorNumber('AUTH_PASSWORD_REQUIRED'),
    AUTH_MISSING_GOOGLE_TOKEN:CommonErrorManager.nextErrorNumber('AUTH_MISSING_GOOGLE_TOKEN'),
    AUTH_NOT_VALID_GOOGLE_TOKEN:CommonErrorManager.nextErrorNumber('AUTH_NOT_VALID_GOOGLE_TOKEN'),
    AUTH_FAIL_TO_GENERATE_ACCESS:CommonErrorManager.nextErrorNumber('AUTH_FAIL_TO_GENERATE_ACCESS'),
    AUTH_FAIL_TO_GENERATE_PERMISSIONS:CommonErrorManager.nextErrorNumber('AUTH_FAIL_TO_GENERATE_PERMISSIONS'),
}

export {
    authErrosCodes
}