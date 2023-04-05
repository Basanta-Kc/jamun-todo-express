import { celebrate, Joi } from "celebrate";

export const validateSignIn = celebrate({
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
});

export const validateSignUp = celebrate({
  body: {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
});
