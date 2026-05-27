import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthShell, { AuthLink } from "./AuthShell";
import { getStoredUser, signIn } from "../utils/auth";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    setError("");
    setSuccess("");
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!formData.email.trim() || !formData.password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    window.setTimeout(() => {
      const user = getStoredUser();
      const email = formData.email.trim().toLowerCase();

      if (!user) {
        setError("No account found. Please create an account first.");
        setLoading(false);
        return;
      }

      if (email !== user.email) {
        setError("Email not found. Please check and try again.");
        setLoading(false);
        return;
      }

      if (formData.password !== user.password) {
        setError("Incorrect password. Please try again.");
        setLoading(false);
        return;
      }

      signIn(user);
      setSuccess("Login successful! Redirecting...");
      navigate(user.role === "admin" ? "/admin-dashboard" : "/user-dashboard", {
        replace: true,
      });
    }, 550);
  };

  return (
    <AuthShell
      icon="bi-shield-lock"
      title="Welcome back"
      subtitle="Sign in to your account to continue"
      footer={
        <>
          <p>
            New here? <AuthLink to="/register">Create account</AuthLink>
          </p>
          <p>
            <AuthLink to="/forgot-password">Forgot password?</AuthLink>
          </p>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <label className="field">
          <span>Email address</span>
          <div className="input-wrapper">
            <i className="bi bi-envelope" aria-hidden="true" />
            <input
              autoComplete="email"
              name="email"
              onChange={handleChange}
              placeholder="you@company.com"
              required
              type="email"
              value={formData.email}
            />
          </div>
        </label>

        <label className="field">
          <span>Password</span>
          <div className="input-wrapper" style={{ position: "relative" }}>
            <i className="bi bi-lock" aria-hidden="true" />
            <input
              autoComplete="current-password"
              name="password"
              onChange={handleChange}
              placeholder="Enter your password"
              required
              type={showPassword ? "text" : "password"}
              value={formData.password}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                color: "var(--muted)",
                cursor: "pointer",
                fontSize: "1.1rem",
              }}
            >
              <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`} />
            </button>
          </div>
        </label>

        {error && (
          <p className="form-alert">
            <i className="bi bi-exclamation-circle" /> {error}
          </p>
        )}

        {success && (
          <p className="form-success">
            <i className="bi bi-check-circle" /> {success}
          </p>
        )}

        <button className="btn primary full" disabled={loading} type="submit">
          {loading ? (
            <>
              <span className="spinner" style={{ display: "inline-block", width: "16px", height: "16px", border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid white", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </button>
      </form>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </AuthShell>
  );
}

export default Login;
