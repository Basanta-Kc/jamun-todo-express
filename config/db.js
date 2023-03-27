const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connectionUrl = process.env.MONGO_URI;
    await mongoose.connect(connectionUrl);
    console.log("Mongo Db Connected.");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;
