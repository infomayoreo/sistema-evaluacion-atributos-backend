import { Router } from 'express';
import { check } from 'express-validator';

// Middlewares
import { validateInputs } from '../../common/middlewares/validate-inputs';
import { currentApiPath, emailAndPassLogin,userAuthState, loginWithGoogle } from '../routerPaths';
// Controllers
import { getAuthState, login } from './auth.controller';
import { googleLogin } from './googleLogin.controller'
import { validateJWT } from '../../common/middlewares/validate-jwt';
import { commonErrorsCodes } from '../../common/errorManager/AppCommonErrorCodes';
import { authErrosCodes } from './authErrorManager';

const router = Router();

// Login a User
router.post(currentApiPath + emailAndPassLogin, [
    check('email', commonErrorsCodes.EMAIL_IS_REQUIRED).not().isEmpty(),
    check('email', commonErrorsCodes.BAD_FORMAT_EMAIL).isEmail(),
    check('password', authErrosCodes.AUTH_PASSWORD_REQUIRED).not().isEmpty(),
    validateInputs
], login );


router.get(currentApiPath + userAuthState, [
    check('token',authErrosCodes.AUTH_MISSING_TOKEN),
    check('token').custom(validateJWT),
    validateInputs
], getAuthState );

router.post(currentApiPath + loginWithGoogle, [
    check('google-id-token',authErrosCodes.AUTH_MISSING_GOOGLE_TOKEN).not().isEmpty(),
    validateInputs
], googleLogin);



export default router;
