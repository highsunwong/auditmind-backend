auditmind-backend/
│
├── package.json
├── tsconfig.json
├── README.md
│
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── api/
│   │   ├── controllers/
│   │   │   ├── audit.controller.ts
│   │   │   ├── agent.controller.ts
│   │   │   ├── tenant.controller.ts
│   │   │   └── auth.controller.ts
│   │   ├── routes/
│   │   │   ├── audit.routes.ts
│   │   │   ├── agent.routes.ts
│   │   │   ├── tenant.routes.ts
│   │   │   └── auth.routes.ts
│   │   └── middleware/
│   │       ├── auth.middleware.ts
│   │       ├── tenant.middleware.ts
│   │       └── rate-limit.middleware.ts
│   ├── agents/
│   │   ├── core/
│   │   │   ├── agent-engine.ts
│   │   │   ├── agent-registry.ts
│   │   │   └── agent-types.ts
│   │   ├── audit/
│   │   │   ├── planning.agent.ts
│   │   │   ├── sampling.agent.ts
│   │   │   ├── testing.agent.ts
│   │   │   ├── reporting.agent.ts
│   │   │   └── qc.agent.ts
│   │   └── r&d/
│   │       └── discovery.agent.ts
│   ├── services/
│   │   ├── audit.service.ts
│   │   ├── agent.service.ts
│   │   ├── tenant.service.ts
│   │   ├── auth.service.ts
│   │   └── queue.service.ts
│   ├── db/prisma/schema.prisma
│   └── utils/
│       ├── logger.ts
│       ├── error.ts
│       ├── env.ts
│       └── crypto.ts