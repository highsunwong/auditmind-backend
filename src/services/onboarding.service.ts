import { createAudit } from "./audit.service";
import { runAgent } from "./agent.service";
import { logAgentExecution } from "../logging/firestore-logger";

export async function createOnboardingAudit(tenantId: string) {
  // Step 1: Create audit record
  const audit = createAudit(tenantId, "Onboarding Audit");

  // Step 2: Run Planning Agent for demo
  const result = await runAgent("planning", { auditName: audit.name });

  // Step 3: Log execution
  await logAgentExecution("planning", { auditName: audit.name }, result);

  return {
    audit,
    demoPlan: result
  };
}