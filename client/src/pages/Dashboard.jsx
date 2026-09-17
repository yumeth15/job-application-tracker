import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import ApplicationForm from "../component/ApplicationForm";
import ApplicationList from "../component/ApplicationsList";
import StatCard from "../component/StatCard";
import StatusFilter from "../component/StatusFilter";
import {
  getApplications,
  createApplication,
  updateApplication,
  deleteApplication,
} from "../services/applicationService";

const FILTERS = ["All", "Applied", "Interview", "Rejected", "Offer"];

function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [applications, setApplications] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const data = await getApplications();
      setApplications(data.applications || data);
    } catch (err) {
      setError(err.message || "Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const filteredApplications = applications.filter((application) => {
    const matchesStatus =
      selectedStatus === "All" || application.status === selectedStatus;
    const searchValue = searchTerm.toLowerCase();
    const matchesSearch =
      !searchValue ||
      [application.company, application.position, application.location]
        .join(" ")
        .toLowerCase()
        .includes(searchValue);

    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: applications.length,
    applied: applications.filter((app) => app.status === "Applied").length,
    interview: applications.filter((app) => app.status === "Interview").length,
    offer: applications.filter((app) => app.status === "Offer").length,
  };

  const handleSubmitApplication = async (formData) => {
    try {
      setLoading(true);
      if (editingApplication) {
        await updateApplication(editingApplication._id, formData);
      } else {
        await createApplication(formData);
      }

      setIsModalOpen(false);
      setEditingApplication(null);
      await fetchApplications();
    } catch (err) {
      setError(err.message || "Failed to save the application");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteApplication = async (id) => {
    if (!window.confirm("Delete this application?")) return;

    try {
      setLoading(true);
      await deleteApplication(id);
      await fetchApplications();
    } catch (err) {
      setError(err.message || "Failed to delete application");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <nav className="navbar">
        <div>
          <p className="nav-kicker">Overview</p>
          <h2>Job Tracker</h2>
        </div>

        <div className="navbar-user">
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <div className="dashboard-container">
        <div className="dashboard-header">
          <div>
            <p className="section-kicker">Dashboard</p>
            <h1>Application pipeline</h1>
          </div>

          <button
            className="add-button"
            onClick={() => {
              setEditingApplication(null);
              setIsModalOpen(true);
            }}
          >
            + Add Application
          </button>
        </div>

        <div className="stats-grid">
          <StatCard title="Total" value={stats.total} />
          <StatCard title="Applied" value={stats.applied} />
          <StatCard title="Interviews" value={stats.interview} />
          <StatCard title="Offers" value={stats.offer} />
        </div>

        <div className="filter-container">
          <input
            className="search-input"
            type="text"
            placeholder="Search by company, role, or location"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />

          <StatusFilter value={selectedStatus} onChange={setSelectedStatus} />
        </div>

        {error && <div className="error-message">{error}</div>}

        {loading && applications.length === 0 ? (
          <div className="loading">Loading applications...</div>
        ) : (
          <ApplicationList
            applications={filteredApplications}
            onEdit={(application) => {
              setEditingApplication(application);
              setIsModalOpen(true);
            }}
            onDelete={handleDeleteApplication}
          />
        )}
      </div>

      {isModalOpen && (
        <ApplicationForm
          application={editingApplication}
          loading={loading}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingApplication(null);
          }}
          onSubmit={handleSubmitApplication}
        />
      )}
    </div>
  );
}

export default Dashboard;