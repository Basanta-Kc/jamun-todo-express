const express = require("express");
const cors = require("cors");
const app = express();
const bcrypt = require("bcryptjs");
const connectDb = require("./config/db");
const todoRoutes = require("./routes/todo");
const User = require("./model/User");
const jwt = require("jsonwebtoken");
const { celebrate, Joi, errors, Segments } = require("celebrate");

require("dotenv").config();

const port = 3000;

connectDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.use("/api/todos", todoRoutes);

function test() {
  const abc = "abkc";
  return (req, res, next) => {
    console.log(abc);
    console.log(req.firstName);
  };
}

app.post(
  "/auth/sign-up",
  celebrate({
    body: {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  async (req, res) => {
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
  }
);

app.post("/auth/sign-in", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (bcrypt.compareSync(req.body.password, user.password)) {
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET_KEY,
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

const checkValue = (req, res, next) => {
  req.name = "basanta";
  if (req.query.value > 10) {
    next();
  } else {
    res.send("value must be greater than 10");
  }
};

const checkAge = (req, res, next) => {
  req.user = "test";
  if (req.query.age > 2) {
    next();
  } else {
    res.send("age is small");
  }
};

app.get("/test", checkValue, checkAge, (req, res) => {
  console.log(req.name);
  console.log(req.user);
  const value = req.query.value;
  res.send("sucesss");
});

app.get("/new-test", checkValue, (req, res) => {
  console.log(req.name, req.user);
  res.send("new-test");
});

app.use(errors());


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
