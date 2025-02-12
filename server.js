const cors = require("cors");
const path = require("path");
const express = require("express");
require("dotenv").config();

const app = express();

const dbConnect = require("./server/src/utils/dbConnect");

// Import Routes
const userRoutes = require("./server/src/routes/userRoute");
const carRoutes = require("./server/src/routes/carRoute");

app.use(cors());
app.use(express.json());
app.use(
  "/images",
  express.static(path.join(__dirname, "server/public/images"))
);

dbConnect();

app.use("/users", userRoutes);
app.use("/cars", carRoutes);

app.listen(
  process.env.PORT,
  console.log(`Server is running on port ${process.env.PORT}`)
);
