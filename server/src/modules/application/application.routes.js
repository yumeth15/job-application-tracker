const express = require("express");

const {
  getAll,
  create,
  update,
  remove,
} = require("./application.controller");

const authMiddleware = require("../../middleware/auth.middleware");

const validationMiddleware = require(
  "../../middleware/validation.middleware"
);

const {
  applicationValidation,
  applicationIdValidation,
} = require("./application.validation");

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  getAll
);

router.post(
  "/",
  authMiddleware,
  applicationValidation,
  validationMiddleware,
  create
);

router.put(
  "/:id",
  authMiddleware,
  applicationIdValidation,
  applicationValidation,
  validationMiddleware,
  update
);

router.delete(
  "/:id",
  authMiddleware,
  applicationIdValidation,
  validationMiddleware,
  remove
);

module.exports = router;