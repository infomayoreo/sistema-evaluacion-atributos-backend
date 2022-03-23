import { JwtPayload } from "jsonwebtoken";

export interface PayloadJWT extends JwtPayload{
    uid?: number;
    name?: string;
    email?: string;
};
