const {
  registerUser,
  loginUser,
} = require("./authservice");

const User = require("./auth.models");

const generateToken = require("../../utils/generateToken");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await registerUser(
      name,
      email,
      password
    );

    const token = generateToken(user._id);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await loginUser(
      email,
      password
    );

    const token = generateToken(user._id);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(
      req.userId
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  register,
  login,
  getMe,
};