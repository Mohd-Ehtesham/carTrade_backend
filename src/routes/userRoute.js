const express = require("express");
const {
  registerUser,
  loginUser,
  protectedUser,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// routes
//register route
router.post("/register", registerUser);

//login route
router.post("/login", loginUser);

//protected route
router.get("/protected", authMiddleware, protectedUser);

module.exports = router;
