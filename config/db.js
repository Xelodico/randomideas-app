const mongoose = require("mongoose");

const connectDB = async () => {
  const con = await mongoose.connect(process.env.MONGO_URI);
  console.log(`MongoDB Connection: ${con.connection.host}`);
};

// mongoose.set("strictQuery", true);

module.exports = connectDB;
