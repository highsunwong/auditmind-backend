import { Request, Response, NextFunction } from "express";

export function authMiddleware(req: Request, _res: Response, next: NextFunction) {
  // Simple mock authentication
  (req as any).user = { id: "demo-user" };
  next();
}