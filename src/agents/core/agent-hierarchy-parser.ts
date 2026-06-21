import { Storage } from "@google-cloud/storage";

const storage = new Storage();
const bucketName = process.env.SKILL_BUCKET || "auditmind-skills";

export async function parseAgentHierarchy(): Promise<Record<string, string[]>> {
  const file = storage.bucket(bucketName).file("agent_hierarchy.md");
  const [contents] = await file.download();
  const lines = contents.toString("utf8").split("\n");

  const hierarchy: Record<string, string[]> = {};
  let currentParent: string | null = null;

  for (const line of lines) {
    if (line.startsWith("#")) {
      currentParent = line.replace("#", "").trim();
      hierarchy[currentParent] = [];
    } else if (currentParent && line.trim()) {
      hierarchy[currentParent].push(line.trim());
    }
  }

  return hierarchy;
}