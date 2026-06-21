import { Request, Response } from "express";
import { validateApiKey } from "../../services/auth.service";

export function validateKeyController(req: Request, res: Response) {
  const { apiKey } = req.body;
  const valid = validateApiKey(apiKey);
  res.json({ valid });
}