import { UserDAO } from '../../db/models';

// Validate if the user exist by uid
export const userExistByUid = async(id = ''): Promise<void> => {
    const userExist = await UserDAO.findOne({ where: { id } });
    if (!userExist || userExist.activate) {
        throw new Error(`The user with uid '${id}' doesn't exist`);
    }
};

// Validate if exist a User with this email
export const userExistWithEmail = async(email = ''): Promise<void> => {
    const emailExist = await UserDAO.findOne({ where: { email:email.toUpperCase() } });
    if (emailExist) {
        throw new Error(`The email '${email}' already exist`);
    }
};

