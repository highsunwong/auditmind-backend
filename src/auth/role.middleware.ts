import { Request, Response, NextFunction } from "express";
import { verifyToken } from "./auth.service";

export function roleMiddleware(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ error: "Missing token" });

    try {
      const decoded: any = verifyToken(token);
      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ error: "Access denied" });
      }
      (req as any).user = decoded;
      next();
    } catch {
      res.status(401).json({ error: "Invalid token" });
    }
  };
}