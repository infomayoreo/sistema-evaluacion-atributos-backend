import { Request, Response } from "express";
import { AttributeDAO, AttributeProfileDAO, AttributeTypeDAO, AttributeValueDAO, ProfileTypeDAO } from '../../../db/models';

export const createAttribute = async( req: Request, res: Response ) : Promise<void> => {
    res.status(200);
}