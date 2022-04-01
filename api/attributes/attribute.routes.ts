import { Router } from 'express';
import { header, query,param,body } from 'express-validator';
import { validateInputs, validateJWT } from '../../common/middlewares';
import { allProfileTypes, allAttributes, allAttributesTypes,allAttributeByProfiles, attributeById, allAttributesValues } from './controllers/attributesGet.controller';
import { commonErrorsCodes } from '../../common/errorManager/AppCommonErrorCodes';
import { authErrosCodes } from '../authenticate/helpers/authErrorManager';
import { currentApiPath, attributeByIdPath, profileTypes,attributesModule,attributeTypes,attributesProfiles,attributeValues } from '../routerPaths';
import { attributeErrosCodes } from './helpers/attributeErrorManager';
import { createAttribute } from './controllers/attributesDataConfiguration.controller';


const router = Router();

//profile types
router.get(currentApiPath + profileTypes, [
    header('token', authErrosCodes.AUTH_MISSING_TOKEN).exists({checkFalsy:true}).notEmpty(),
    header('token').custom(validateJWT).withMessage(authErrosCodes.AUTH_NOT_VALID_TOKEN),
    validateInputs,
], allProfileTypes );

//attributes by type
router.get(currentApiPath + attributesModule, [
    header('token', authErrosCodes.AUTH_MISSING_TOKEN).exists({checkFalsy:true}).notEmpty(),
    header('token').custom(validateJWT).withMessage(authErrosCodes.AUTH_NOT_VALID_TOKEN),
    query('page',commonErrorsCodes.PAGE_NOT_VALID_DATA_TYPE).optional().isInt(),
    query('limit',commonErrorsCodes.LIMIT_NOT_VALID_DATA_TYPE).optional().isInt(),
    query('attributeTypeId',attributeErrosCodes.ATTRIBUTE_TYPE_ID_IS_NOT_NUMERIC).optional().isNumeric().toInt(),
    validateInputs,
], allAttributes );

//profiles types
router.get(currentApiPath + attributeTypes, [
    header('token', authErrosCodes.AUTH_MISSING_TOKEN).exists({checkFalsy:true}).notEmpty(),
    header('token').custom(validateJWT).withMessage(authErrosCodes.AUTH_NOT_VALID_TOKEN),
    validateInputs,
], allAttributesTypes);

//attributes by profiles
router.get(currentApiPath + attributesProfiles , [
    header('token', authErrosCodes.AUTH_MISSING_TOKEN).exists({checkFalsy:true}).notEmpty(),
    header('token').custom(validateJWT).withMessage(authErrosCodes.AUTH_NOT_VALID_TOKEN),
    query('page',commonErrorsCodes.PAGE_NOT_VALID_DATA_TYPE).optional().isInt(),
    query('limit',commonErrorsCodes.LIMIT_NOT_VALID_DATA_TYPE).optional().isInt(),
    query('profileId',attributeErrosCodes.ATTRIBUTE_PROFILE_TYPE_ID_IS_NOT_NUMERIC).optional().isInt(),
    validateInputs,
], allAttributeByProfiles);

router.get(currentApiPath + attributeByIdPath + '/:id',[
    header('token', authErrosCodes.AUTH_MISSING_TOKEN).exists({checkFalsy:true}).notEmpty(),
    header('token').custom(validateJWT).withMessage(authErrosCodes.AUTH_NOT_VALID_TOKEN),
    param('id',attributeErrosCodes.ATTRIBUTE_ID_IS_NOT_NUMERIC).isInt(),
    validateInputs,
],attributeById);

router.get(currentApiPath + attributeValues, [
    header('token', authErrosCodes.AUTH_MISSING_TOKEN).exists({checkFalsy:true}).notEmpty(),
    header('token').custom(validateJWT).withMessage(authErrosCodes.AUTH_NOT_VALID_TOKEN),
    validateInputs,
],allAttributesValues);

router.post(currentApiPath + attributesModule,[
    header('token', authErrosCodes.AUTH_MISSING_TOKEN).exists({checkFalsy:true}).notEmpty(),
    header('token').custom(validateJWT).withMessage(authErrosCodes.AUTH_NOT_VALID_TOKEN),
    body('attributeTypeId', attributeErrosCodes.ATTRIBUTE_TYPE_ID_IS_NOT_NUMERIC).exists({checkFalsy:true}).notEmpty().isNumeric().toInt(),
    body('name', attributeErrosCodes.ATTRIBUTE_NAME_BAD_FORMAT).exists({checkFalsy:true}).isString().trim().notEmpty().toLowerCase(),
    body('description', attributeErrosCodes.ATTRIBUTE_DESCRIPTION_BAD_FORMAT).optional({checkFalsy:true}).isString().trim().toLowerCase(),
    body('range', attributeErrosCodes.ATTRIBUTE_RANGE_ARRAY_BAD_FORMAT)
        .exists({checkFalsy:true})
        .notEmpty()
        .isArray()
        .custom((arr) => { return arr.every(Number.isInteger)}).withMessage(attributeErrosCodes.ATTRIBUTE_RANGE_ARRAY_BAD_FORMAT),
    body('profiles', attributeErrosCodes.ATTRIBUTE_PROFILE_ARRAY_BAD_FORMAT)
        .optional({checkFalsy:true})
        .isArray()
        .custom((arr) => { return arr.every(Number.isInteger)}).withMessage(attributeErrosCodes.ATTRIBUTE_PROFILE_ARRAY_BAD_FORMAT),
    validateInputs,
],createAttribute);

export default router;