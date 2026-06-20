const mongoose = require("mongoose");

const connectDB = async () => {
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI missing");
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Database connected");
};

module.exports = connectDB;
