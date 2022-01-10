import { Router } from "express";
import { loginByEmail } from "./actions/login";
import { registerByEmail } from "./actions/register";

const router = Router();

router.post("/login/email", async (req, res) => {
  const { email, password } = req.body;
  const result = await loginByEmail({ email, password });
  if (result.user) {
    return res.sendStatus(200);
  } else {
    return res.sendStatus(422);
  }
});

router.post("/register/email", async (req, res) => {
  const { name, email, password } = req.body;

  const result = await registerByEmail({ name, email, password });

  if (result.user) {
    return res.sendStatus(200);
  } else {
    return res.sendStatus(422);
  }
});

export default router;
