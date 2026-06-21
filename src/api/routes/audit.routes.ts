import { Router } from "express";
import { createAuditController, getAuditController } from "../controllers/audit.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { tenantMiddleware } from "../middleware/tenant.middleware";
import { rateLimitMiddleware } from "../middleware/rate-limit.middleware";

const router = Router();

router.post(
  "/create",
  rateLimitMiddleware,
  authMiddleware,
  tenantMiddleware,
  createAuditController
);

router.get(
  "/:id",
  rateLimitMiddleware,
  authMiddleware,
  tenantMiddleware,
  getAuditController
);

export default router;