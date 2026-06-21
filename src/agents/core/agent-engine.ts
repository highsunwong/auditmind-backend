import { Agent } from "./agent-types";

export class AgentEngine {
  constructor(private agent: Agent) {}
  async run(input: any): Promise<any> {
    return this.agent.execute(input);
  }
}