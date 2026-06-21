export class PlanningAgent {
  name = "planning";
  async execute(input: any) {
    return {
      plan: `Generated audit plan for ${input.auditName}`,
      riskAssessment: ["High risk: revenue", "Medium risk: inventory"]
    };
  }
}