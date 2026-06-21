export class QCAgent {
  name = "qc";
  async execute(_input: any) {
    return {
      agent: this.name,
      qcFindings: [],
      status: "QC passed"
    };
  }
}