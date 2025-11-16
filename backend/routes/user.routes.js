const router = require("express").Router();
const { body } = require("express-validator");
const {
  loginUser,
  registerUser,
  verifyUser,
} = require("../controllers/user.controller");

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Enter a valid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password should be 6 characters minimum"),
  ],
  loginUser
);

router.post(
  "/register",
  [
    body("firstname")
      .isLength({ min: 2 })
      .withMessage("Firstname should be of 2 characters minimum"),
    body("email").isEmail().withMessage("Enter a valid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password should be 6 characters minimum"),
  ],
  registerUser
);

router.get("/verify", verifyUser);

module.exports = router;
