import { hash, check } from "./password.js";

describe("password hash and check", () => {
  it("hashes password", async () => {
    const result = await hash("12345678");
    expect(result).toBeTruthy();
  });

  it("wrong hash", async () => {
    const result = await check(
      "wrong_password",
      "$2b$10$1ZOuPgacF6.1FZg.VGMpXeVRp57J1X5yJ7fOdlR3uvHHf///ugrvy"
    );
    expect(result).toBe(false);
  });

  it("correct hash", async () => {
    const result = await check(
      "12345678",
      "$2b$10$1ZOuPgacF6.1FZg.VGMpXeVRp57J1X5yJ7fOdlR3uvHHf///ugrvy"
    );
    expect(result).toBe(true);
  });
});
