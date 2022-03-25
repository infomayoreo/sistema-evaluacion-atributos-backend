import { Router } from 'express';
import { header, body,param } from 'express-validator';
import { validateInputs, validateJWT } from '../../common/middlewares';
import { allProfileTypes,allAttributes } from './controllers/profileType.controller';

import { commonErrorsCodes } from '../../common/errorManager/AppCommonErrorCodes';
import { authErrosCodes } from '../authenticate/helpers/authErrorManager';
import { currentApiPath, profileTypes,attributesModule } from '../routerPaths';
import { googleLogin } from '../authenticate/controllers/googleLogin.controller';

const router = Router();

//profile types
router.get(currentApiPath + profileTypes, [
    header('token',authErrosCodes.AUTH_MISSING_TOKEN).notEmpty(),
    header('token').custom(validateJWT).withMessage(authErrosCodes.AUTH_NOT_VALID_TOKEN),
    validateInputs,
], allProfileTypes );


router.get(currentApiPath + attributesModule, [
    header('token',authErrosCodes.AUTH_MISSING_TOKEN).notEmpty(),
    header('token').custom(validateJWT).withMessage(authErrosCodes.AUTH_NOT_VALID_TOKEN),
    param('page',).optional(),
    param('limit').optional(),
    validateInputs,
], allAttributes );

export default router;