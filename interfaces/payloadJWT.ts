import { JwtPayload } from "jsonwebtoken";

export interface PayloadJWT extends JwtPayload{
    uid?: string;
    name?: string;
    email?: string;
};
