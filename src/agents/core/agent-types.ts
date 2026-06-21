export interface Agent {
  name: string;
  execute(input: any): Promise<any>;
}