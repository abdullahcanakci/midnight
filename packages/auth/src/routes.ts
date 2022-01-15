import { Router } from "express";
import { loginByEmail } from "./actions/login.js";
import { registerByEmail } from "./actions/register.js";
import * as Joi from "joi";
import requestValidator from "./utils/requestValidator.js";

const router = Router();

const loginValidator = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

router.post(
  "/login/email",
  requestValidator(loginValidator),
  async (req, res) => {
    const { email, password } = req.body;
    const result = await loginByEmail({ email, password });
    if (result.user) {
      return res.sendStatus(200);
    } else {
      return res.sendStatus(422);
    }
  }
);

const registerValidator = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(8),
});

router.post(
  "/register/email",
  requestValidator(registerValidator),
  async (req, res) => {
    const { name, email, password } = req.body;

    const result = await registerByEmail({ name, email, password });

    if (result.user) {
      return res.sendStatus(200);
    } else {
      return res.sendStatus(422);
    }
  }
);

export default router;
