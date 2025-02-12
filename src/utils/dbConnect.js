const mongoose = require("mongoose");
require("dotenv").config();

const DB =
  process.env.DATABASE_ATLAS.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
  ) + "?retryWrites=true&w=majority"; // Ensure retry on failure

const dbConnect = async () => {
  try {
    await mongoose.connect(DB);
    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ MongoDB Connection Failed: ", err);
    process.exit(1); // Exit on failure
  }
};

module.exports = dbConnect;
