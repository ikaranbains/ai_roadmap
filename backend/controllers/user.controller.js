const userModel = require("../models/user.model");
const { validationResult } = require("express-validator");
const userService = require("../services/user.service");
const jwt = require("jsonwebtoken");

module.exports.loginUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  const isMatch = await user.comparePassword(password);

  // console.log("matching", isMatch);

  if (!isMatch) {
    return res.status(401).json({
      message: "Invalid Email or Password",
    });
  }

  const token = user.generateAuthToken();

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  return res.status(200).json({
    user,
    message: "Login Successfull",
    status: 200,
  });
};

module.exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { firstname, lastname, email, password } = req.body;

  const userExists = await userModel.findOne({ email });
  if (userExists) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const hashedPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({
    firstname,
    lastname,
    email,
    password: hashedPassword,
  });

  // const token = user.generateAuthToken();

  return res.status(201).json({
    user,
    message: "User created successfully",
    status: 201,
  });
};

module.exports.verifyUser = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.json({ success: false });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ success: true, user: decoded });
  } catch {
    res.json({ success: false, message: "Something went wrong" });
  }
};
