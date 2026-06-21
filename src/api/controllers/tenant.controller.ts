import { Request, Response } from "express";
import { getTenant } from "../../services/tenant.service";

export function getTenantController(req: Request, res: Response) {
  const tenantId = (req as any).tenantId || "demo-tenant";
  const tenant = getTenant(tenantId);
  if (!tenant) return res.status(404).json({ error: "Tenant not found" });
  res.json(tenant);
}