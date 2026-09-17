const Application = require("./application.model");

const getApplications = async (userId) => {
  return Application.find({
    user: userId,
  }).sort({
    createdAt: -1,
  });
};

const createApplication = async (
  userId,
  applicationData
) => {
  const application = await Application.create({
    ...applicationData,
    user: userId,
  });

  return application;
};

const updateApplication = async (
  userId,
  applicationId,
  applicationData
) => {
  const application =
    await Application.findOneAndUpdate(
      {
        _id: applicationId,
        user: userId,
      },
      applicationData,
      {
        new: true,
        runValidators: true,
      }
    );

  if (!application) {
    throw new Error(
      "Application not found"
    );
  }

  return application;
};

const deleteApplication = async (
  userId,
  applicationId
) => {
  const application =
    await Application.findOneAndDelete({
      _id: applicationId,
      user: userId,
    });

  if (!application) {
    throw new Error(
      "Application not found"
    );
  }

  return application;
};

module.exports = {
  getApplications,
  createApplication,
  updateApplication,
  deleteApplication,
};