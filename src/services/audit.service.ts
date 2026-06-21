interface Audit {
  id: string;
  tenantId: string;
  name: string;
  status: string;
  progress: number;
}

const audits: Record<string, Audit> = {};

export function createAudit(tenantId: string, name: string): Audit {
  const id = `audit_${Date.now()}`;
  const audit: Audit = { id, tenantId, name, status: "pending", progress: 0 };
  audits[id] = audit;
  return audit;
}

export function getAudit(id: string): Audit | undefined {
  return audits[id];
}