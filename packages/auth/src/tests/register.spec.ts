import { registerByEmail } from "../actions/register";
import { TestDbManager, User } from "@midnight/db";
import * as bcrypt from "bcrypt";
import * as request from "supertest";
import server from "../server";
import { RegisterError } from "../actions/results";

beforeAll(async () => {
  await TestDbManager.connect();
});

beforeEach(async () => {
  await TestDbManager.clearDatabase();
});

afterAll(async () => {
  await TestDbManager.closeDatabase();
});

describe("email register", () => {
  test("action success", async () => {
    const password = await bcrypt.hash("12345678", 10);
    const email = "test@example.com";

    const result = await registerByEmail({
      email,
      password: "12345678",
      name: "",
    });
    expect(result.user).toBeTruthy();
  });

  test("action duplicate", async () => {
    const password = await bcrypt.hash("12345678", 10);
    const email = "test@example.com";
    await User.create({ email, password, name: "test" });

    const result = await registerByEmail({
      email,
      password: "12345678",
      name: "",
    });
    expect(result.user).toBeFalsy();
    expect(result.errors).toContain(RegisterError.DUPLICATE);
  });

  test("register endpoint 200", async () => {
    const email = "test@example.com";
    await request(server)
      .post("/register/email")
      .send({ name: "test", email, password: "12345678" })
      .expect(200);

    const user = await User.findOne({ email });
    expect(user).toBeDefined();
  });

  test("register missing param 422", async (done) => {
    const email = "test@example.com";

    request(server)
      .post("/register/email")
      .send({ email, password: "wrong_password" })
      .expect(422)
      .end(done);
  });

  test("register duplicate email 422", async (done) => {
    const password = await bcrypt.hash("12345678", 10);
    const email = "test@example.com";
    await User.create({ email, password, name: "test" });

    request(server)
      .post("/register/email")
      .send({ email, password: "wrong_password" })
      .expect(422)
      .end(done);
  });
});
