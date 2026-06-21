import { getAgent } from "../agents/core/agent-registry";

export async function enqueueAgentJob(agentName: string, input: any): Promise<any> {
  const agent = getAgent(agentName);
  if (!agent) throw new Error(`Agent not found: ${agentName}`);

  // Simulate async queue processing
  return new Promise((resolve) => {
    setTimeout(async () => {
      const result = await agent.execute(input);
      resolve(result);
    }, 500);
  });
}