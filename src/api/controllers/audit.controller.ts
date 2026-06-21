import { Request, Response } from "express";
import { createAudit, getAudit } from "../../services/audit.service";

export function createAuditController(req: Request, res: Response) {
  const tenantId = (req as any).tenantId || "demo-tenant";
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "name is required" });

  const audit = createAudit(tenantId, name);
  res.status(201).json(audit);
}

export function getAuditController(req: Request, res: Response) {
  const { id } = req.params;
  const audit = getAudit(id);
  if (!audit) return res.status(404).json({ error: "Audit not found" });
  res.json(audit);
}