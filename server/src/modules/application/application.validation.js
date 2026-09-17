const { body, param } = require("express-validator");

const applicationValidation = [
  body("company")
    .trim()
    .notEmpty()
    .withMessage("Company is required"),

  body("position")
    .trim()
    .notEmpty()
    .withMessage("Position is required"),

  body("status")
    .optional()
    .isIn(["Applied", "Interview", "Rejected", "Offer"])
    .withMessage("Status must be valid"),

  body("location")
    .optional()
    .trim(),

  body("appliedDate")
    .optional()
    .isISO8601()
    .withMessage("Applied date must be a valid date"),

  body("jobUrl")
    .optional()
    .isURL()
    .withMessage("Job URL must be a valid URL"),

  body("notes")
    .optional()
    .trim(),
];

const applicationIdValidation = [
  param("id")
    .notEmpty()
    .withMessage("Application ID is required")
    .isMongoId()
    .withMessage("Application ID must be valid"),
];

module.exports = {
  applicationValidation,
  applicationIdValidation,
};