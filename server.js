import express, { json, urlencoded } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import connectDb from "./config/db.js";
import todoRoutes from "./routes/todo.route.js";
import authRoutes from "./routes/auth.route.js";
import { errors } from "celebrate";

dotenv.config();
const port = 3001;

connectDb();

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.use("/api/todos", todoRoutes);
app.use("/api/auth", authRoutes);

app.use(errors());

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
