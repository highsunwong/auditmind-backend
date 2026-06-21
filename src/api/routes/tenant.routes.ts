import { Router } from "express";
import { getTenantController } from "../controllers/tenant.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { tenantMiddleware } from "../middleware/tenant.middleware";

const router = Router();

router.get("/", authMiddleware, tenantMiddleware, getTenantController);

export default router;