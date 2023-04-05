import { verify } from "jsonwebtoken";
import User from "../model/User.js";

const protect = async (req, res, next) => {
  const token = req.headers.token;
  try {
    const user = verify(token, process.env.JWT_SECRET_KEY);
    req.authUser = await User.findOne({ _id: user.id });
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: "unauthorized.",
    });
    return;
  }
};

export default protect;
