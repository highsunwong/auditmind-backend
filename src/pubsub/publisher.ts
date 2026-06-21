import { PubSub } from "@google-cloud/pubsub";

const pubsub = new PubSub();
const topicName = process.env.PUBSUB_TOPIC || "auditmind-agent-jobs";

/**
 * Publish a job to Pub/Sub
 */
export async function publishAgentJob(agentName: string, input: any) {
  const dataBuffer = Buffer.from(JSON.stringify({ agentName, input }));
  await pubsub.topic(topicName).publish(dataBuffer);
  console.log(`✅ Published job for agent ${agentName}`);
}