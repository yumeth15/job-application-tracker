function ApplicationCard({ application, onEdit, onDelete }) {
  const initials = (application.company || "J")
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div className="application-card">
      <div className="application-main">
        <div className="company-icon">{initials}</div>

        <div className="application-info">
          <h3 className="company-name">{application.company}</h3>
          <p className="application-position">{application.position}</p>
          <p className="application-location">
            {application.location || "Remote"}
          </p>
        </div>
      </div>

      <div className="application-meta">
        <span className={`status status-${application.status?.toLowerCase()}`}>
          {application.status}
        </span>

        <div className="application-actions">
          {application.jobUrl && (
            <a
              className="text-link"
              href={application.jobUrl}
              target="_blank"
              rel="noreferrer"
            >
              View job
            </a>
          )}

          <button type="button" className="edit-button" onClick={() => onEdit(application)}>
            Edit
          </button>
          <button type="button" className="delete-button" onClick={() => onDelete(application._id)}>
            Delete
          </button>
        </div>
      </div>

      {application.notes && <p className="application-notes">{application.notes}</p>}
    </div>
  );
}

export default ApplicationCard;
