const { celebrate, Joi } = require("celebrate");

const validateAddTodo = celebrate({
  body: {
    name: Joi.string().required(),
    status: Joi.string().valid("In Progress", "Done", "Todo").default("Todo"),
  },
});

const validateUpdateTodo = celebrate({
  body: {
    name: Joi.string(),
    status: Joi.string().valid("In Progress", "Done", "Todo").default("Todo"),
  },
  params: {
    id: Joi.string().required(),
  },
});

module.exports = {
  validateAddTodo,
  validateUpdateTodo,
};
