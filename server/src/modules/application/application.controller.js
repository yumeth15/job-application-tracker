const {
  getApplications,
  createApplication,
  updateApplication,
  deleteApplication,
} = require("./application.service");

const getAll = async (req, res) => {
  try {
    const applications =
      await getApplications(req.userId);

    res.status(200).json({
      applications,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const create = async (req, res) => {
  try {
    const application =
      await createApplication(
        req.userId,
        req.body
      );

    res.status(201).json({
      message:
        "Application created successfully",
      application,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const application =
      await updateApplication(
        req.userId,
        req.params.id,
        req.body
      );

    res.status(200).json({
      message:
        "Application updated successfully",
      application,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const remove = async (req, res) => {
  try {
    await deleteApplication(
      req.userId,
      req.params.id
    );

    res.status(200).json({
      message:
        "Application deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAll,
  create,
  update,
  remove,
};