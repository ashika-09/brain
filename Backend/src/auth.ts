import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "./config";

interface AuthenticatedRequest extends Request {
    userId?: string;
}

function auth(req: AuthenticatedRequest, res: Response, next: NextFunction):any{
    const token = req.headers.token as string | undefined;

    if (!token) {
        return res.status(401).json({ message: "Token is missing" });
    }

    try {
        const response = jwt.verify(token, JWT_SECRET) as JwtPayload;

        if (response && typeof response.id === "string") {
            req.userId = response.id;
            next();
        } else {
             res.status(403).json({ message: "Invalid credentials" });
        }
    } catch (error:any) {
         res.status(403).json({ message: "Invalid credentials", error: error.message });
    }
}

export default auth;
