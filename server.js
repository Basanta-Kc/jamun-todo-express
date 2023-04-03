const express = require("express");
const cors = require("cors");
const app = express();
const bcrypt = require("bcryptjs");
const connectDb = require("./config/db");
const todoRoutes = require("./routes/todo");
const User = require("./model/User");
const jwt = require("jsonwebtoken");


require("dotenv").config();

const port = 3000;

connectDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.use("/api/todos", todoRoutes);

app.post("/auth/sign-up", async (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);
  await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
  });

  res.json({
    message: "Signed Up Successfully.",
  });
});

app.post("/auth/sign-in", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (bcrypt.compareSync(req.body.password, user.password)) {
   const token =  jwt.sign(
      {
        id: user._id,
        email: user.email
      },
      "top-secret-key",
      { expiresIn: "1h" }
    );

    res.json({
      token: token,
      message: "Successfully Logged In.",
    });
  } else {
    res.status(401).json({
      message: "Email or Password Is Incorrect",
    });
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
