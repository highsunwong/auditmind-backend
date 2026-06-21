import { Request, Response } from "express";
import { runAgent } from "../../services/agent.service";

export async function runAgentController(req: Request, res: Response) {
  const { agentName, input } = req.body;
  if (!agentName) return res.status(400).json({ error: "agentName required" });
  const result = await runAgent(agentName, input);
  res.json({ agent: agentName, result });
}