import { Router } from 'express';
import { header, query } from 'express-validator';
import { validateInputs, validateJWT } from '../../common/middlewares';
import { allProfileTypes, allAttributes, allAttributesTypes } from './controllers/profileType.controller';
import { commonErrorsCodes } from '../../common/errorManager/AppCommonErrorCodes';
import { authErrosCodes } from '../authenticate/helpers/authErrorManager';
import { currentApiPath, profileTypes,attributesModule,attributeTypes } from '../routerPaths';
import { attributeErrosCodes } from './helpers/attributeErrorManager';


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
    query('page',commonErrorsCodes.PAGE_NOT_VALID_DATA_TYPE).optional().isInt(),
    query('limit',commonErrorsCodes.LIMIT_NOT_VALID_DATA_TYPE).optional().isInt(),
    query('attributeTypeId',attributeErrosCodes.ATTRIBUTE_TYPE_ID_IS_NOT_NUMERIC).optional().isNumeric(),
    validateInputs,
], allAttributes );


router.get(currentApiPath + attributeTypes, [
    header('token',authErrosCodes.AUTH_MISSING_TOKEN).notEmpty(),
    header('token').custom(validateJWT).withMessage(authErrosCodes.AUTH_NOT_VALID_TOKEN),
    validateInputs,
], allAttributesTypes)

export default router;