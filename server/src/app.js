const express = require("express");
const cors = require("cors");

const authRoutes = require("./modules/auth.routes");

const applicationRoutes = require(
  "./modules/application/application.routes"
);

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message:
      "Job Application Tracker API is running",
  });
});

app.get("/api", (req, res) => {
  res.json({
    message: "Job Application Tracker API is running",
    endpoints: {
      auth: "/api/auth",
      applications: "/api/applications",
    },
  });
});

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/applications",
  applicationRoutes
);

module.exports = app;