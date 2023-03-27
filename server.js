const express = require("express");
const cors = require("cors");
const app = express();
const todo = require("./route/todo");
const connectDB = require("./config/db");

require("dotenv").config();

const port = 3000;

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.use("/api/todos", todo);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//Accessing infomration form request
// If its post method (form input) req.body
// If its get method (form input) req.query
// If its get or post method and we need to access value from url
// for eg. /todos/delete/123 => /todos/delete/:id  => req.params.id
