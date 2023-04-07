import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const { genSaltSync, hashSync, compareSync } = bcrypt;
import User from "../model/User.js";

export const signUp = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (user) {
    res.status(400).json({
      message: "User already exist.",
    });
    return;
  }

  const salt = genSaltSync(10);
  const hashedPassword = hashSync(req.body.password, salt);

  await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
  });

  res.json({
    message: "Signed Up Successfully.",
  });
};

export const signIn = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    res.status(400).json({
      message: "user doesn't exist",
    });

    return;
  }

  if (compareSync(req.body.password, user.password)) {
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.json({
      token: token,
      message: "Successfully Logged In.",
    });

    return;
  }

  res.status(401).json({
    message: "Email or Password Is Incorrect",
  });
};
