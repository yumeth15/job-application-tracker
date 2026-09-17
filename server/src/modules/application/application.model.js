const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      trim: true,
    },

    position: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "Applied",
        "Interview",
        "Rejected",
        "Offer",
      ],
      default: "Applied",
    },

    location: {
      type: String,
      trim: true,
    },

    appliedDate: {
      type: Date,
    },

    jobUrl: {
      type: String,
      trim: true,
    },

    notes: {
      type: String,
      trim: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model(
  "Application",
  applicationSchema
);

module.exports = Application;