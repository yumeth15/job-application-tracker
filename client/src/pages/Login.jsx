import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
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
      await login(formData.email, formData.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-panel auth-illustration-panel">
        <div className="brand-badge">JobNest</div>
        <h1>Keep your job search calm and organized.</h1>
        <p>
          Track roles, follow up without forgetting, and keep a clear picture of
          where each opportunity stands.
        </p>

        <div className="feature-list">
          <div className="feature-item">
            <span className="feature-dot">✓</span>
            <span>All your applications in one place</span>
          </div>
          <div className="feature-item">
            <span className="feature-dot">✓</span>
            <span>Easy follow-up reminders</span>
          </div>
          <div className="feature-item">
            <span className="feature-dot">✓</span>
            <span>Clear view of your progress</span>
          </div>
        </div>
      </div>

      <div className="auth-panel auth-form-panel">
        <div className="auth-card compact-card">
          <div className="auth-header">
            <p className="eyebrow">Welcome back</p>
            <h2>Login</h2>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
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
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {error && <p className="error-message auth-error">{error}</p>}

            <button type="submit" className="auth-button primary-button">
              Sign In
            </button>
          </form>

          <p className="auth-link-row">
            Don’t have an account? <Link to="/register">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
