import bcrypt from "bcryptjs";

interface User {
  id: string;
  email: string;
  passwordHash: string;
  tenantId: string;
  role: string;
}

const users: Record<string, User> = {};

export function createUser(email: string, password: string, tenantId: string, role: string): User {
  const id = `user_${Date.now()}`;
  const passwordHash = bcrypt.hashSync(password, 10);
  const user: User = { id, email, passwordHash, tenantId, role };
  users[id] = user;
  return user;
}

export function getUserByEmail(email: string): User | undefined {
  return Object.values(users).find((u) => u.email === email);
}