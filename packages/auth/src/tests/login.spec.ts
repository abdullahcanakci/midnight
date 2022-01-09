import { loginByEmail } from "../actions/login";
import { TestDbManager, User } from "@midnight/db";
import * as bcrypt from "bcrypt";
import * as request from "supertest";
import server from "../server";

beforeAll(async () => {
  await TestDbManager.connect();
});

beforeEach(async () => {
  await TestDbManager.clearDatabase();
});

afterAll(async () => {
  await TestDbManager.closeDatabase();
});

describe("email login", () => {
  test("action success", async () => {
    const password = await bcrypt.hash("12345678", 10);
    const email = "test@example.com";
    await User.create({ email, password, name: "test" });

    const result = await loginByEmail({ email, password: "12345678" });
    expect(result.user).toBeTruthy();
  });

  test("login endpoint 200", async () => {
    const password = await bcrypt.hash("12345678", 10);
    const email = "test@example.com";
    await User.create({ email, password, name: "test" });

    request(server)
      .post("/login/email")
      .send({ email, password: "12345678" })
      .expect(200);
  });

  test("wrong password 422", async () => {
    const password = await bcrypt.hash("12345678", 10);
    const email = "test@example.com";
    await User.create({ email, password, name: "test" });

    request(server)
      .post("/login/email")
      .send({ email, password: "wrong_password" })
      .expect(422);
  });

  test("non existing user 422", async () => {
    const email = "test@example.com";

    request(server)
      .post("/login/email")
      .send({ email, password: "wrong_password" })
      .expect(422);
  });
});
