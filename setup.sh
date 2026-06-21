cat > setup.sh << 'EOF'
#!/usr/bin/env bash
set -e

mkdir -p src/api/controllers
mkdir -p src/api/routes
mkdir -p src/api/middleware
mkdir -p src/agents/core
mkdir -p src/agents/audit
mkdir -p "src/agents/r&d"
mkdir -p src/services
mkdir -p src/db/prisma
mkdir -p src/utils

################################
# package.json
################################
cat > package.json << 'PJ'
{
  "name": "auditmind-backend",
  "version": "1.0.0",
  "main": "dist/server.js",
  "license": "MIT",
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.19.2"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^22.0.0",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.5.0"
  }
}
PJ

################################
# tsconfig.json
################################
cat > tsconfig.json << 'TS'
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "rootDir": "src",
    "outDir": "dist",
    "esModuleInterop": true,
    "strict": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
TS

################################
# src/utils/env.ts
################################
cat > src/utils/env.ts << 'ENV'
export const env = {
  PORT: process.env.PORT ? Number(process.env.PORT) : 4000
};
ENV

################################
# src/utils/logger.ts
################################
cat > src/utils/logger.ts << 'LOG'
export const logger = {
  info: (...args: unknown[]) => console.log("[INFO]", ...args),
  error: (...args: unknown[]) => console.error("[ERROR]", ...args),
  warn: (...args: unknown[]) => console.warn("[WARN]", ...args)
};
LOG

################################
# src/utils/error.ts
################################
cat > src/utils/error.ts << 'ERR'
export class AppError extends Error {
  status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}
ERR

################################
# src/utils/crypto.ts (stub)
################################
cat > src/utils/crypto.ts << 'CR'
export function hash(value: string): string {
  return `hashed:${value}`;
}
CR

################################
# src/app.ts
################################
cat > src/app.ts << 'APP'
import express from "express";
import cors from "cors";
import { env } from "./utils/env";
import auditRoutes from "./api/routes/audit.routes";
import agentRoutes from "./api/routes/agent.routes";
import tenantRoutes from "./api/routes/tenant.routes";
import authRoutes from "./api/routes/auth.routes";
import { logger } from "./utils/logger";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ status: "AuditMind backend online", port: env.PORT });
});

app.use("/audit", auditRoutes);
app.use("/agent", agentRoutes);
app.use("/tenant", tenantRoutes);
app.use("/auth", authRoutes);

app.use((err: any, _req: any, res: any, _next: any) => {
  logger.error("Unhandled error:", err);
  res.status(err.status || 500).json({ error: err.message || "Internal server error" });
});
APP

################################
# src/server.ts
################################
cat > src/server.ts << 'SRV'
import { app } from "./app";
import { env } from "./utils/env";
import { loadAgents } from "./agents/core/agent-registry";
import { logger } from "./utils/logger";

async function bootstrap() {
  await loadAgents();
  app.listen(env.PORT, () => {
    logger.info(`AuditMind backend running on port ${env.PORT}`);
  });
}

bootstrap();
SRV

################################
# src/api/middleware/auth.middleware.ts
################################
cat > src/api/middleware/auth.middleware.ts << 'AMW'
import { Request, Response, NextFunction } from "express";

export function authMiddleware(req: Request, _res: Response, next: NextFunction) {
  // No-op auth for now, just log
  (req as any).user = { id: "demo-user" };
  next();
}
AMW

################################
# src/api/middleware/tenant.middleware.ts
################################
cat > src/api/middleware/tenant.middleware.ts << 'TMW'
import { Request, Response, NextFunction } from "express";

export function tenantMiddleware(req: Request, _res: Response, next: NextFunction) {
  // Simple tenant from header or default
  const tenantId = req.header("x-tenant-id") || "demo-tenant";
  (req as any).tenantId = tenantId;
  next();
}
TMW

################################
# src/api/middleware/rate-limit.middleware.ts
################################
cat > src/api/middleware/rate-limit.middleware.ts << 'RMW'
import { Request, Response, NextFunction } from "express";

export function rateLimitMiddleware(_req: Request, _res: Response, next: NextFunction) {
  // No real limiting, just placeholder
  next();
}
RMW

################################
# src/agents/core/agent-type