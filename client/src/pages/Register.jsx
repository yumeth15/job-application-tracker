import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await register(formData.name, formData.email, formData.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-panel auth-illustration-panel">
        <div className="brand-badge">JobNest</div>
        <h1>Start making your job search feel manageable.</h1>
        <p>
          Save your applications, keep an eye on progress, and make it easier to
          move from one opportunity to the next without losing track.
        </p>

        <div className="feature-list">
          <div className="feature-item">
            <span className="feature-dot">✓</span>
            <span>Keep your search organized</span>
          </div>
          <div className="feature-item">
            <span className="feature-dot">✓</span>
            <span>Know what needs attention next</span>
          </div>
          <div className="feature-item">
            <span className="feature-dot">✓</span>
            <span>Stay focused on your next move</span>
          </div>
        </div>
      </div>

      <div className="auth-panel auth-form-panel">
        <div className="auth-card compact-card">
          <div className="auth-header">
            <p className="eyebrow">Create account</p>
            <h2>Register</h2>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {error && <p className="error-message auth-error">{error}</p>}

            <button type="submit" className="auth-button primary-button">
              Create account
            </button>
          </form>

          <p className="auth-link-row">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
