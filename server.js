const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));

const connectionUrl =
  "mongodb+srv://jamuntech:JamunTech123@cluster0.8q40emm.mongodb.net/todo-app?retryWrites=true&w=majority";

mongoose.connect(connectionUrl);

const Todo = mongoose.model("todos", {
  name: String,
});

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  const result = await Todo.find();
  res.render("todos", { todos: result });
});

app.post("/todos", async (req, res) => {
  await Todo.create({ name: req.body.todo });
  const result = await Todo.find();
  res.render("todos", { todos: result });

  // Todo.create({ name: req.body.todo }).then(() => {
  //   res.render("todos", { name: "bibek" });
  // });
});

app.post("/todos/delete/:id", async (req, res) => {
  await Todo.deleteOne({ _id: req.params.id });
  const result = await Todo.find();
  res.render("todos", { todos: result });
});

app.get("/todos/edit/:id", async (req, res) => {
  const result = await Todo.findOne({ _id: req.params.id });
  res.render("edit-todo", { todo: result });
});

app.post("/todos/edit/:id", async (req, res) => {
  await Todo.updateOne(
    { _id: req.params.id },
    {
      name: req.body.todo,
    }
  );
  const result = await Todo.find();
  res.render("todos", { todos: result });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
