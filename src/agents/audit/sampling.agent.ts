export class SamplingAgent {
  name = "sampling";
  async execute(input: any) {
    return {
      agent: this.name,
      sampleSize: 42,
      basis: input?.population || "unknown population"
    };
  }
}