import Todo from "../model/Todo.js";

export const getTodos = async (req, res) => {
  const todos = await Todo.find({ userId: req.authUser.id });
  res.status(200).json({
    data: todos,
  });
};

export const deleteTodo = async (req, res) => {
  const todo = await Todo.findOne({
    userId: req.authUser.id,
    _id: req.params.id,
  });

  if (!todo) {
    res.status(404).json({
      message: "Todo not found.",
    });

    return;
  }
  await deleteOne({ _id: req.params.id });
  res.status(200).json({
    message: "Deleted Successfully.",
  });
};

export const updateTodo = async (req, res) => {
  const todo = await Todo.findOne({
    userId: req.authUser.id,
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

export const addTodo = async (req, res) => {
  await Todo.create({
    name: req.body.name,
    status: req.body.status,
    userId: req.authUser.id,
  });

  res.status(201).json({
    message: "Created Successfully.",
  });
};
