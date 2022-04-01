import { Router } from 'express';
import { header,body } from 'express-validator';
import { validateInputs } from '../../common/middlewares/validate-inputs';
import { currentApiPath, emailAndPassLogin,userAuthState, loginWithGoogle, verifyGoogleEmailPath } from '../routerPaths';
import { validateJWT } from '../../common/middlewares/validate-jwt';
import { commonErrorsCodes } from '../../common/errorManager/AppCommonErrorCodes';
import { authErrosCodes } from '../authenticate/helpers/authErrorManager'


const router = Router();



export default router;