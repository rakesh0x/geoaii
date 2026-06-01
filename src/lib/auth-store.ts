import crypto from "crypto";

export interface StoredUser {
  id: string;
  username: string;
  name: string;
  passwordHash: string;
  salt: string;
}

const users = new Map<string, StoredUser>();

export function getUserByUsername(username: string): StoredUser | undefined {
  return users.get(username);
}

export function createUser(username: string, passwordHash: string, salt: string): StoredUser {
  const user: StoredUser = {
    id: crypto.randomUUID(),
    username,
    name: username,
    passwordHash,
    salt,
  };
  users.set(username, user);
  return user;
}
