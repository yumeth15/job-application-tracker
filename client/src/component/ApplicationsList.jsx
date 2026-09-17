import ApplicationCard from "./ApplicationCard";

function ApplicationList({ applications, onEdit, onDelete }) {
  if (applications.length === 0) {
    return (
      <div className="empty-state">
        <h3>No applications found</h3>
        <p>
          Try changing your search or filter, or add a new application.
        </p>
      </div>
    );
  }

  return (
    <div className="application-list">
      {applications.map((application) => (
        <ApplicationCard
          key={application._id}
          application={application}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default ApplicationList;