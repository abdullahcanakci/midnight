import { Router } from "express";
import { loginByEmail } from "./actions/login";

const router = Router();

router.post("/login/email", async (req, res) => {
  const { email, password } = req.body;
  const result = await loginByEmail({ email, password });
  console.log("test");
  if (result.user) {
    return res.sendStatus(200);
  } else {
    return res.sendStatus(422);
  }
});

export default router;
