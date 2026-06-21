import { getAgent } from "./agent-registry";
import { parseAgentHierarchy } from "./agent-hierarchy-parser";
import { logAgentExecution } from "../../logging/firestore-logger";

/**
 * Run a parent agent and cascade into its sub‑agents
 */
export async function runAgentWithOrchestration(parentAgentName: string, input: any) {
  const hierarchy = await parseAgentHierarchy();
  const parentAgent = getAgent(parentAgentName);

  if (!parentAgent) throw new Error(`Parent agent ${parentAgentName} not found`);

  console.log(`🚀 Running parent agent: ${parentAgentName}`);
  const parentResult = await parentAgent.execute(input);
  await logAgentExecution(parentAgentName, input, parentResult);

  // Cascade into sub‑agents
  const subAgents = hierarchy[parentAgentName] || [];
  for (const sub of subAgents) {
    const subAgent = getAgent(sub);
    if (!subAgent) {
      console.warn(`⚠️ Sub‑agent ${sub} not registered`);
      continue;
    }

    console.log(`➡️ Triggering sub‑agent: ${sub}`);
    const subResult = await subAgent.execute({ parentResult });
    await logAgentExecution(sub, { parentResult }, subResult);
  }

  return { parentResult, subResults: subAgents };
}