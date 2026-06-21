import { app } from "./app";
import { env } from "./utils/env";
import { loadAgents } from "./agents/core/agent-registry";
import { logger } from "./utils/logger";
import { startSubscriber } from "./pubsub/subscriber";

async function bootstrap() {
  await loadAgents();
  app.listen(env.PORT, () => {
    logger.info(`AuditMind backend running on port ${env.PORT}`);
  });

  // Start Pub/Sub listener
  startSubscriber();
}

bootstrap();