const express = require("express");
const cors = require("cors");
const User = require("./model/User");
const app = express();
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const connectDb = require("./config/db");
const todoRoutes = require("./routes/todo");

require("dotenv").config();

const port = 3000;

connectDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.use("/api/todos", todoRoutes);

app.post("/sign-up", async (req, res) => {
  await User.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
  });

  res.send("ok");
});

app.post("/sign-in", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  console.log(user, bcrypt.compareSync(user.password, req.body.password));
  if (bcrypt.compareSync(req.body.password, user.password)) {
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      "top_notch_secret_key",
      { expiresIn: "1h" }
    );

    res.json({
      token: token,
    });

    return;
  }

  res.send("incorrenct");
});
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
