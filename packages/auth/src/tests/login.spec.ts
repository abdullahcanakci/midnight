import { loginByEmail } from "../actions/login";
import { TestDbManager, User } from "@midnight/db";
import * as bcrypt from "bcrypt";

beforeAll(async () => {
  await TestDbManager.connect();
});

beforeEach(async () => {
  await TestDbManager.clearDatabase();
});

afterAll(async () => {
  await TestDbManager.closeDatabase();
});

test("tests successfull login", async () => {
  const password = await bcrypt.hash("12345678", 10);
  const email = "test@example.com";
  await User.create({ email, password, name: "test" });

  const result = await loginByEmail({ email, password: "12345678" });
  expect(result.user).toBeTruthy();
});
