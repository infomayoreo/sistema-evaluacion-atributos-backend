import { Router } from 'express';
import { check } from 'express-validator';

// Middlewares
import { validateInputs } from '../../common/middlewares/validate-inputs';

// Controllers
import { getAuthState, login,  } from './auth.controller';
import { googleLogin } from './google-login.controller'
import { validateJWT } from '../../common/middlewares/validate-jwt';
import { commonErrorsCodes } from '../../common/errorManager/AppCommonErrorCodes';
import { authErrosCodes } from './authErrorManager';

const router = Router();

// Login a User
router.post('/login', [
    check('email', commonErrorsCodes.EMAIL_IS_REQUIRED).not().isEmpty(),
    check('email', commonErrorsCodes.BAD_FORMAT_EMAIL).isEmail(),
    check('password', authErrosCodes.AUTH_PASSWORD_REQUIRED).not().isEmpty(),
    validateInputs
], login );

// Login a User
router.get('/auth-state', [
    check('token',authErrosCodes.AUTH_MISSING_TOKEN),
    check('token').custom(validateJWT),
    validateInputs
], getAuthState );

router.post('/google-login', [
    check('google-id-token',authErrosCodes.AUTH_MISSING_GOOGLE_TOKEN).not().isEmpty(),
    validateInputs
], googleLogin);



export default router;
