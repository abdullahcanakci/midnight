import * as bcrypt from "bcrypt";
import { User } from "@midnight/db";
import { LoginResult } from "./results.js";

interface LoginByEmailInterface {
  email: String;
  password: String;
}

export async function loginByEmail({
  email,
  password,
}: LoginByEmailInterface): Promise<LoginResult> {
  const userFound = await User.findOne({ email });
  if (!userFound) {
    return { user: null };
  }

  const result = await bcrypt.compare(
    password.toString(),
    userFound.password.toString()
  );

  return {
    user: result ? userFound : null,
  };
}
