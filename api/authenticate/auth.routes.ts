import { Router } from 'express';
import { check } from 'express-validator';

// Middlewares
import { validateInputs } from '../../common/middlewares/validate-inputs';

// Controllers
import { getAuthState, login } from './auth.controller';
import { validateJWT } from '../../common/middlewares/validate-jwt';

const router = Router();

// Login a User
router.post('/login', [
    check('email', 'This isn\'t a valid email').isEmail(),
    check('email', 'The email is required').not().isEmpty(),
    check('password', 'The password is required').not().isEmpty(),
    validateInputs
], login );

// Login a User
router.get('/auth-state', [
    validateJWT,
    validateInputs
], getAuthState );


export default router;
