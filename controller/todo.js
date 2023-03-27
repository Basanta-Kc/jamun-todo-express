const Todo = require("../model/Todo");

const getTodos = async (req, res) => {
  const todos = await Todo.find();
  res.json({
    data: todos,
  });
};

const deleteTodo = async (req, res) => {
  await Todo.deleteOne({ id: req.params.id });
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
      name: req.body.todo,
    }
  );

  res.json({
    message: "Updated Successfully.",
  });
};

const createTodo = async (req, res) => {
  await Todo.create({
    name: req.body.todo,
  });
  res.json({
    message: "Created Successfully.",
  });
};

module.exports = {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo
}