import { Router } from 'express';
import { check } from 'express-validator';

// Helpers
import { userExistByUid, userExistWithEmail } from '../../common/helpers/db-validators';

// Middlewares
import { validateInputs } from '../../common/middlewares/validate-inputs';

// Controllers
import {
    getUsers,
    getUserByUid,
    createUser,
    updateUser,
    deleteUser
} from './users.controller';

const router = Router();

// Get all Users
router.get('/', getUsers );

// Get a User by uid
router.get('/:uid', [
    check('uid').custom( userExistByUid ),
    validateInputs
], getUserByUid );

// Create a User
router.post('/', [
    check('name', 'The name is obligatory').not().isEmpty(),
    check('password', 'The password must contain at least 6 characters').isLength({ min: 6 }),
    check('email', 'This isn\'t a valid email').isEmail(),
    check('email').custom( userExistWithEmail ),
    validateInputs
], createUser );

// Update a User
router.put('/:uid', [
    check('uid').custom( userExistByUid ),
    validateInputs
], updateUser );

// Delete a User
router.delete('/:uid', [
    check('uid').custom( userExistByUid ),
    validateInputs
], deleteUser );

export default router;