import type { User } from "./user.model";

export type AuthRequest = Pick<User, "email" | "password">;

export interface AuthResponse {
  access_token: string;
  user: User;
}
