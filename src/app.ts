import express from "express";
import cors from "cors";
import auditRoutes from "./api/routes/audit.routes";
import agentRoutes from "./api/routes/agent.routes";

export const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => res.json({ status: "AuditMind backend online" }));
app.use("/audit", auditRoutes);
app.use("/agent", agentRoutes);