import { Router } from "express";
import { registerController } from "../../auth/register.controller";
import { validateKeyController } from "../../api/controllers/auth.controller";

const router = Router();

router.post("/register", registerController);
router.post("/validate-key", validateKeyController);

export default router;