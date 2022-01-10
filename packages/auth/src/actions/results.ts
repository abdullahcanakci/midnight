import { UserInterface } from "@midnight/db";

enum RegisterError {
  ERROR,
  DUPLICATE,
}

interface LoginResult {
  user?: UserInterface;
}

interface RegisterResult {
  user?: UserInterface;
  errors?: RegisterError[];
}

export { LoginResult, RegisterResult, RegisterError };
