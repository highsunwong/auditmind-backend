import { Storage } from "@google-cloud/storage";
import path from "path";

const storage = new Storage();
const bucketName = process.env.SKILL_BUCKET || "auditmind-skills";
const bucket = storage.bucket(bucketName);

/**
 * Load a SKILL.md file from GCS
 */
export async function loadSkillFile(skillPath: string): Promise<string> {
  const file = bucket.file(skillPath);
  const [contents] = await file.download();
  return contents.toString("utf8");
}

/**
 * Load SKILL.md with support for <<include:...>> directives
 */
export async function loadSkillWithIncludes(skillPath: string): Promise<string> {
  let content = await loadSkillFile(skillPath);

  const includeRegex = /<<include:(.*?)>>/g;
  let match;

  while ((match = includeRegex.exec(content)) !== null) {
    const includePath = match[1].trim();
    const includeContent = await loadSkillFile(includePath);
    content = content.replace(match[0], includeContent);
  }

  return content;
}