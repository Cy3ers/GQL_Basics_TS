export interface User {
  id: string;
  name: string;
  email: string;
}

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserInput {
  name?: string;
  email?: string;
}

export interface AuthUser {
  id: number;
  name: string;
}

export interface Context {
  users: User[];
  user: AuthUser | null;
}
