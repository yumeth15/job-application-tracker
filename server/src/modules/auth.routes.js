const express = require("express");

const {
  register,
  login,
  getMe,
} = require("./auth/authcontroller");

const authMiddleware = require(
  "../middleware/auth.middleware"
);

const validationMiddleware = require(
  "../middleware/validation.middleware"
);

const {
  registerValidation,
  loginValidation,
} = require("./auth/auth.validation");

const router = express.Router();

router.post(
  "/register",
  registerValidation,
  validationMiddleware,
  register
);

router.post(
  "/login",
  loginValidation,
  validationMiddleware,
  login
);

router.get(
  "/me",
  authMiddleware,
  getMe
);

module.exports = router;