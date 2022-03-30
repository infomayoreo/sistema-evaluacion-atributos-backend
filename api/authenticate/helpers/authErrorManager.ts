import {nextErrorNumber} from '../../../common/errorManager/AppCommonErrorCodes'

const authErrosCodes = {
    AUTH_MISSING_TOKEN:nextErrorNumber('AUTH_MISSING_TOKEN'),
    AUTH_NOT_VALID_TOKEN:nextErrorNumber('AUTH_NOT_VALID_TOKEN'),
    AUTH_NOT_VALID_USER:nextErrorNumber('AUTH_NOT_VALID_USER'),
    AUTH_PASSWORD_REQUIRED:nextErrorNumber('AUTH_PASSWORD_REQUIRED'),
    AUTH_MISSING_GOOGLE_TOKEN:nextErrorNumber('AUTH_MISSING_GOOGLE_TOKEN'),
    AUTH_NOT_VALID_GOOGLE_TOKEN:nextErrorNumber('AUTH_NOT_VALID_GOOGLE_TOKEN'),
    AUTH_FAIL_TO_GENERATE_ACCESS:nextErrorNumber('AUTH_FAIL_TO_GENERATE_ACCESS'),
    AUTH_FAIL_TO_GENERATE_PERMISSIONS:nextErrorNumber('AUTH_FAIL_TO_GENERATE_PERMISSIONS'),
    AUTH_MUST_VERIFY_YOUR_EMAIL:nextErrorNumber('AUTH_MUST_VERIFY_YOUR_EMAIL'),
} as const;

export {
    authErrosCodes
}