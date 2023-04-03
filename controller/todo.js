const Todo = require("../model/Todo");
const jwt = require("jsonwebtoken");

const getTodos = async (req, res) => {
  const todos = await Todo.find();
  res.status(200).json({
    data: todos,
  });
};

const deleteTodo = async (req, res) => {
  await Todo.deleteOne({ _id: req.params.id });
  res.status(200).json({
    message: "Deleted Successfully.",
  });
};

const updateTodo = async (req, res) => {
  const token = req.headers.token;
  let user;
  try {
    user = jwt.verify(token, "top-secret-key");
    console.log(user);
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: "unauthorized.",
    });

    return;
  }

  const todo = await Todo.findOne({
    userId: user.id,
    _id: req.params.id,
  });

  if (!todo) {
    res.status(404).json({
      message: "Todo not found.",
    });

    return;
  }

  await Todo.updateOne(
    {
      _id: req.params.id,
    },
    {
      name: req.body.name,
      status: req.body.status,
    }
  );

  res.status(200).json({
    message: "Updated Successfully.",
  });
};

const addTodo = async (req, res) => {
  const token = req.headers.token;

  console.log("token is here:", token);
  let user;
  try {
    user = jwt.verify(token, "top-secret-key");
    console.log(user);
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: "unauthorized.",
    });

    return;
  }

  await Todo.create({
    name: req.body.name,
    status: req.body.status,
    userId: user.id,
  });

  res.status(201).json({
    message: "Created Successfully.",
  });
};

module.exports = {
  addTodo,
  deleteTodo,
  updateTodo,
  getTodos,
};
