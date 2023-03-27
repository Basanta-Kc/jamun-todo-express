const express = require("express");
const cors = require("cors");
const app = express();

const connectDb = require('./config/db')
const todoRoutes = require('./routes/todo')

require("dotenv").config();

const port = 3000;

connectDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.use('/api/todos', todoRoutes)

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});


