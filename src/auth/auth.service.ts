import jwt from "jsonwebtoken";
import { getTenant } from "../services/tenant.service";

const JWT_SECRET = process.env.JWT_SECRET || "auditmind-secret";

export function generateToken(user: any) {
  return jwt.sign(
    { id: user.id, tenantId: user.tenantId, role: user.role },
    JWT_SECRET,
    { expiresIn: "12h" }
  );
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    throw new Error("Invalid or expired token");
  }
}

export async function authenticateUser(email: string, password: string) {
  // Mock authentication
  if (email === "admin@auditmind.ai" && password === "admin123") {
    const tenant = getTenant("demo-tenant");
    return {
      id: "user_admin",
      tenantId: tenant?.id,
      role: "ADMIN",
      email
    };
  }
  throw new Error("Invalid credentials");
}