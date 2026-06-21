import { PubSub } from "@google-cloud/pubsub";
import { runAgentWithSkill } from "../agents/core/gcs-agent-loader";
import { logAgentExecution, logPubSubEvent } from "../logging/firestore-logger";

const pubsub = new PubSub();
const subscriptionName = process.env.PUBSUB_SUBSCRIPTION || "auditmind-agent-sub";

export function startSubscriber() {
  const subscription = pubsub.subscription(subscriptionName);

  subscription.on("message", async (message) => {
    try {
      const { agentName, input } = JSON.parse(message.data.toString());
      console.log(`📩 Received job for agent ${agentName}`);

      await logPubSubEvent(subscriptionName, { agentName, input });

      const result = await runAgentWithSkill(agentName, input);
      await logAgentExecution(agentName, input, result);

      message.ack();
    } catch (err) {
      console.error("❌ Error processing message:", err);
      message.nack();
    }
  });

  subscription.on("error", (err) => {
    console.error("❌ Subscriber error:", err);
  });

  console.log(`🚀 Pub/Sub subscriber listening on ${subscriptionName}`);
}