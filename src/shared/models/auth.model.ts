import type { User } from "./user.model";

export interface Token {
  token: string;
  type: string;
}

export type AuthRequest = Pick<User, "email" | "password">;

export interface AuthResponse {
  token: Token;
  user: User;
}