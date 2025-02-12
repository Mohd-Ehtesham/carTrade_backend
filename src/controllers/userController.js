const bcrypt = require("bcryptjs");
const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");

// Register Controller
const registerUser = async (request, response) => {
  try {
    // check if user already exists
    console.log(
      "🔵 Incoming Registration Request of creating new user :",
      request.body
    ); // Debug Log
    const existingUser = await User.findOne({ email: request.body.email });

    if (existingUser) {
      console.log("🔴 User Already Exists!");
      return response.status(400).json({ message: "User already exists" });
    }

    // hashing the password
    const hashedPassword = await bcrypt.hash(request.body.password, 10);
    console.log("Request body:", request.body);

    // creae a new user
    const newUser = new User({
      name: request.body.name,
      email: request.body.email,
      password: hashedPassword,
    });

    // saving a new user
    const savedUser = await newUser.save();
    console.log("Saving user:", newUser);

    // send response after saving the new user
    response
      .status(200)
      .json({ message: "User registered successfully 😺", savedUser });
  } catch (error) {
    // send an error response
    response.status(500).json({ success: false, message: error.message });
  }
};

// Login Controller
const loginUser = async (request, response) => {
  try {
    // check if user exists or not
    const user = await User.findOne({ email: request.body.email });

    if (!user) {
      response.status(404).json({
        message: "User with given email does not exist",
        success: false,
      });
    }

    // compare the password
    const isMatch = await bcrypt.compare(request.body.password, user.password);

    if (!isMatch) {
      response
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    }

    // generate the jwt token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    console.log("token from login controller :", token);

    // send response with token and userInfo
    response.status(200).json({
      message: "Login Success",
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.log(error);
    response.status(400).json({
      message: `Error occurred in login: ${error.message}`,
      success: false,
    });
  }
};

// Authorization controller
const protectedUser = async (request, response) => {
  try {
    // Fetch user details based on the user ID from the decoded token
    const user = await User.findById(request.user.id).select("-password");

    // if user is not found return an error response
    if (!user) {
      response.status(404).json({ message: "User not found", success: false });
    }

    // Return user data without password
    response.status(200).send({ data: user, success: true });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Authentication Error",
      success: false,
      error,
    });
  }
};
module.exports = { registerUser, loginUser, protectedUser };
