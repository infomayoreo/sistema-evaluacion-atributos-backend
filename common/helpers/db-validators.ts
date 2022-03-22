import { UserDAO } from '../../db/models';

// Validate if the user exist by uid
export const userExistByUid = async(uid = ''): Promise<void> => {
    const userExist = await UserDAO.findOne({ where: { uid } });
    if (!userExist || userExist.activate === 0) {
        throw new Error(`The user with uid '${uid}' doesn't exist`);
    }
};

// Validate if exist a User with this email
export const userExistWithEmail = async(email = ''): Promise<void> => {
    const emailExist = await UserDAO.findOne({ where: { email } });
    if (emailExist) {
        throw new Error(`The email '${email}' already exist`);
    }
};

