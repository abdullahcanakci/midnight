import * as mongoose from "mongoose";

const { Schema, model } = mongoose;

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
    email: { type: String, index: { unique: true, sparse: true } },
    password: String,
  },
  { timestamps: true }
);

const User = model<UserInterface>("User", UserSchema);

export default User;

export { UserInterface };
