interface Tenant {
  id: string;
  name: string;
  createdAt: string;
}

const tenants: Record<string, Tenant> = {};

export function createTenant(name: string): Tenant {
  const id = `tenant_${Date.now()}`;
  const tenant: Tenant = { id, name, createdAt: new Date().toISOString() };
  tenants[id] = tenant;
  return tenant;
}

export function getTenant(id: string): Tenant | undefined {
  return tenants[id];
}