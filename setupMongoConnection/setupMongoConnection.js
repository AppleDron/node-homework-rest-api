const mongoose = require("mongoose");
const {
  DB_MONGO_USER,
  DB_MONGO_PASSWORD,
  DB_MONGO_DATABASE,
} = require("../constants/env");

const setupMongoConnection = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_MONGO_USER}:${DB_MONGO_PASSWORD}@cluster0.zihgjoy.mongodb.net/${DB_MONGO_DATABASE}`
    );
    console.log("Database connection successful");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = setupMongoConnection;
