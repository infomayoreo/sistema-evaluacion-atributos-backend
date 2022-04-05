import { Router } from 'express';
import { header, query } from 'express-validator';
import { validateInputs } from '../../common/middlewares/validate-inputs';
import { validateJWT } from '../../common/middlewares/validate-jwt';
import { commonErrorsCodes } from '../../common/errorManager/AppCommonErrorCodes';
import { authErrosCodes } from '../authenticate/helpers/authErrorManager'
import { currentApiPath, personModule } from '../routerPaths'
import { allPersons } from './controllers/personGet.controller';
import { validateActivateUser } from '../users/middlewares/checkActivateUser';


const router = Router();

router.get( currentApiPath + personModule, [
    header('token', authErrosCodes.AUTH_MISSING_TOKEN).exists({checkFalsy:true}).notEmpty(),
    header('token').custom(validateJWT).withMessage(authErrosCodes.AUTH_NOT_VALID_TOKEN),
    query('page',commonErrorsCodes.PAGE_NOT_VALID_DATA_TYPE).optional().isInt(),
    query('limit',commonErrorsCodes.LIMIT_NOT_VALID_DATA_TYPE).optional().isInt(),
    validateInputs,
    validateActivateUser,
    
], allPersons);

export default router;