import * as Joi from "joi";
import { Request, Response, NextFunction } from "express";

interface ValidationError {
  message: string;
  key: string;
}

interface ValidatorError {
  type: string;
  errors: ValidationError[];
}

const requestValidator =
  (schema: Joi.ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      console.log(error);
      const response: ValidatorError = {
        type: "error.validation",
        errors: [],
      };
      error.details.forEach((element) => {
        response.errors.push({
          message: element.message,
          key: element.context.key,
        });
      });

      res.status(422).json(response).end();
    } else {
      req.body = value;
      next();
    }
  };
export default requestValidator;
