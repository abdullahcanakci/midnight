import { User } from "@midnight/db";
import { check } from "../utils/password.js";
import { LoginResult } from "./results.js";

interface LoginByEmailInterface {
  email: string;
  password: string;
}

export async function loginByEmail({
  email,
  password,
}: LoginByEmailInterface): Promise<LoginResult> {
  const userFound = await User.findOne({ email });
  if (!userFound) {
    return { user: null };
  }

  const result = await check(password, userFound.password);

  return {
    user: result ? userFound : null,
  };
}
