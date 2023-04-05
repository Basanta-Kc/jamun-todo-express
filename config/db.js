import { connect } from "mongoose";

const connectDb = async () => {
  try {
    const connectionUrl = process.env.MONGO_URI;
    await connect(connectionUrl);
    console.log("Mongo Db Connected.");
  } catch (error) {
    console.log(error);
  }
};

export default connectDb;
