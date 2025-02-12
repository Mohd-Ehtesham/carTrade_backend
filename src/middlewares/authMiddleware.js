const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = async (request, response, next) => {
  const token = request.header("Authorization")?.split(" ")[1];
  console.log("token ->", token);

  if (!token) {
    response
      .status(401)
      .json({ message: "Access Denied. No Token is Provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.user = decoded;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    if (error.name === "TokenExpiredError") {
      return response
        .status(401)
        .json({ message: "Token expired. Please log in again." });
    }
    return response.status(400).json({ message: "Invalid Token." });
  }
};
module.exports = authMiddleware;
