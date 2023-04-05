import { celebrate, Joi } from "celebrate";

export const validateAddTodo = celebrate({
  body: {
    name: Joi.string().required(),
    status: Joi.string().valid("In Progress", "Done", "Todo").default("Todo"),
  },
});

export const validateUpdateTodo = celebrate({
  body: {
    name: Joi.string(),
    status: Joi.string().valid("In Progress", "Done", "Todo").default("Todo"),
  },
  params: {
    id: Joi.string().required(),
  },
});

