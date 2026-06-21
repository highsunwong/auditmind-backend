import { Firestore } from "@google-cloud/firestore";

const firestore = new Firestore();
const collectionName = process.env.FIRESTORE_LOG_COLLECTION || "auditmind_logs";

/**
 * Log agent execution result to Firestore
 */
export async function logAgentExecution(agentName: string, input: any, result: any) {
  const docRef = firestore.collection(collectionName).doc();
  await docRef.set({
    agentName,
    input,
    result,
    timestamp: new Date().toISOString()
  });
  console.log(`📝 Logged agent ${agentName} execution to Firestore`);
}

/**
 * Log Pub/Sub event to Firestore
 */
export async function logPubSubEvent(topic: string, message: any) {
  const docRef = firestore.collection(collectionName).doc();
  await docRef.set({
    type: "pubsub",
    topic,
    message,
    timestamp: new Date().toISOString()
  });
  console.log(`📝 Logged Pub/Sub event from topic ${topic}`);
}