import { Router } from "express";
import { runAgentController } from "../controllers/agent.controller";

const router = Router();
router.post("/run", runAgentController);
export default router;