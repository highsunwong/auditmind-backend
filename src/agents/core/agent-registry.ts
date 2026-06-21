import { Agent } from "./agent-types";
import { parseAgentHierarchy } from "./agent-hierarchy-parser";

// Registry of agents
const agents: Record<string, Agent> = {};

/**
 * Register a new agent
 */
export function registerAgent(agent: Agent) {
  agents[agent.name] = agent;
}

/**
 * Get agent by name
 */
export function getAgent(name: string): Agent | undefined {
  return agents[name];
}

/**
 * Load agents with hierarchy
 */
export async function loadAgentsWithHierarchy() {
  const hierarchy = await parseAgentHierarchy();

  for (const parent in hierarchy) {
    const subAgents = hierarchy[parent];

    console.log(`🔗 Parent Agent: ${parent}`);
    console.log(`   Sub‑Agents: ${subAgents.join(", ")}`);

    // Example: auto‑register sub‑agents under parent
    subAgents.forEach((sub) => {
      if (agents[sub]) {
        console.log(`✅ Linked ${sub} under ${parent}`);
      } else {
        console.warn(`⚠️ Sub‑agent ${sub} not found in registry`);
      }
    });
  }
}