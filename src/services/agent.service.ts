import { getAgent } from "../agents/core/agent-registry";

export async function runAgent(agentName: string, input: any) {
  const agent = getAgent(agentName);
  if (!agent) throw new Error(`Agent not found: ${agentName}`);
  return agent.execute(input);
}