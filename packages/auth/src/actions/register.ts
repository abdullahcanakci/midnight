import { User } from "@midnight/db";
import { RegisterError, RegisterResult } from "./results";

interface RegisterByEmailInterface {
  email: string;
  password: string;
  name: string;
}

export async function registerByEmail({
  email,
  password,
  name,
}: RegisterByEmailInterface): Promise<RegisterResult> {
  try {
    // TODO: hash password
    const newUser = new User({ name, email, password });
    newUser.validateSync();
    await newUser.save();
    return { user: newUser };
  } catch (err) {
    if (err.name === "MongoServerError" && err.code === 11000) {
      return { errors: [RegisterError.DUPLICATE] };
    }
    return { errors: [RegisterError.ERROR] };
  }
}
