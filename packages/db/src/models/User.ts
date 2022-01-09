import { Schema, model } from "mongoose";

interface UserInterface {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  { timestamps: true }
);

const User = model<UserInterface>("User", UserSchema);

export default User;

export { UserInterface };
