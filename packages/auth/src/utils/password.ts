import * as bcrypt from "bcrypt";

export async function hash(
  password: string,
  rounds: number = 10
): Promise<string> {
  const result = await bcrypt.hash(password, rounds);
  return result;
}

export async function check(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  const result = await bcrypt.compare(password, hashedPassword);
  return result;
}
