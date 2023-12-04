const mongoose = require("mongoose");
require('dotenv').config();

//const { NOTES_APP_MONGODB_HOST} = process.env;

//const MONGODB_URI = `${NOTES_APP_MONGODB_HOST}`;

const connectDB = async () => {
  try {
    mongoose.connect(process.env.NOTES_APP_MONGODB_HOST, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    });
    console.log("Database is connected");
  } catch (e) {
    console.log(e);
  }
};

module.exports = {connectDB}
