const Todo = require("../model/Todo");

const getTodos = async (req, res) => {
  const todos = await Todo.find();
  res.json({
    data: todos,
  });
};

const deleteTodo = async (req, res) => {
  await Todo.deleteOne({ _id: req.params.id });
  res.json({
    message: "Deleted Successfully.",
  });
};

const updateTodo = async (req, res) => {
  await Todo.updateOne(
    {
      _id: req.params.id,
    },
    {
      name: req.body.name,
      status: req.body.status
    }
  );

  res.json({
    message: "Updated Successfully.",
  });
};

const addTodo = async (req, res) => {
  await Todo.create({
    name: req.body.name,
    status: req.body.status,
  });
  res.json({
    message: "Created Successfully.",
  });
};

module.exports = {
  addTodo,
  deleteTodo,
  updateTodo,
  getTodos,
};
