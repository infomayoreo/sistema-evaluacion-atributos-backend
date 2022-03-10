import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import { UserDAO } from '../../db/models';

export const getUsers = async (req: Request, res: Response): Promise<void> => {

	try {
		const users = await UserDAO.findAll({ where: { status: 1 } });
		res.json(users);

	} catch (error) {
		console.log({ error });
		res.status(500).json({ msg: 'Talk with the admin' });
	}

}

export const getUserByUid = async (req: Request, res: Response): Promise<void> => {

	const { uid } = req.params;

	try {
		// Search in DB
		const user = await UserDAO.findByPk(uid);
		res.json(user);

	} catch (error) {
		console.log({ error });
		res.status(500).json({ msg: 'Talk with the admin' });
	}

}

export const createUser = async (req: Request, res: Response): Promise<void> => {

	const { password, ...restUser } = req.body;

	// Encrypt password
	const salt = bcrypt.genSaltSync();
	const bcryptPassword = bcrypt.hashSync(password, salt);

	try {
		// Create and save
		const user = await UserDAO.create({
			...restUser,
			password: bcryptPassword
		});

		res.json({ msg: 'User created successfully', user: {...restUser} });

	} catch (error) {
		console.log({ error });
		res.status(500).json({ msg: 'Talk with the admin' });
	}

}

export const updateUser = async (req: Request, res: Response): Promise<void> => {

	const { uid } = req.params;
	const { body } = req;

	try {
		const user = await UserDAO.findByPk(uid);

		// Update user
		if (user) await user.update(body);

		res.json(user);

	} catch (error) {
		console.log({ error });
		res.status(500).json({ msg: 'Talk with the admin' });
	}

}

export const deleteUser = async (req: Request, res: Response): Promise<void> => {

	const { uid } = req.params;

	try {
		const user = await UserDAO.findByPk(uid);

		// Logic delete
		if (user) await user.update({ status: 0 });

		res.json({ msg: `User delete successfully` });

	} catch (error) {
		console.log({ error });
		res.status(500).json({ msg: 'Talk with the admin' });
	}

}
