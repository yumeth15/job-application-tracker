import { useEffect, useState } from "react";

function ApplicationForm({
  application,
  onSubmit,
  onCancel,
  loading,
}) {
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    status: "Applied",
    location: "",
    appliedDate: "",
    jobUrl: "",
    notes: "",
  });

  useEffect(() => {
    if (application) {
      setFormData({
        company: application.company || "",
        position: application.position || "",
        status: application.status || "Applied",
        location: application.location || "",
        appliedDate: application.appliedDate
          ? application.appliedDate.split("T")[0]
          : "",
        jobUrl: application.jobUrl || "",
        notes: application.notes || "",
      });
    }
  }, [application]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">

        <div className="modal-header">
          <h2>
            {application
              ? "Edit Application"
              : "Add Application"}
          </h2>

          <button onClick={onCancel}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Company</label>

            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Google"
              required
            />
          </div>

          <div className="form-group">
            <label>Position</label>

            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="Software Engineer"
              required
            />
          </div>

          <div className="form-group">
            <label>Status</label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Rejected">Rejected</option>
              <option value="Offer">Offer</option>
            </select>
          </div>

          <div className="form-group">
            <label>Location</label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Colombo / Remote"
            />
          </div>

          <div className="form-group">
            <label>Applied Date</label>

            <input
              type="date"
              name="appliedDate"
              value={formData.appliedDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Job URL</label>

            <input
              type="url"
              name="jobUrl"
              value={formData.jobUrl}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>

          <div className="form-group">
            <label>Notes</label>

            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Interview on Monday..."
              rows="4"
            />
          </div>

          <div className="form-actions">

            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : application
                ? "Update Application"
                : "Add Application"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default ApplicationForm;