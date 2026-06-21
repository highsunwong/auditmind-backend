export class ReportingAgent {
  name = "reporting";
  async execute(_input: any) {
    return {
      agent: this.name,
      report: "Draft audit report generated.",
      opinion: "unmodified"
    };
  }
}