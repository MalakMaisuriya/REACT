import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthShell, { AuthLink } from "./AuthShell";
import { saveUser } from "../utils/auth";

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const getPasswordStrength = (password) => {
    if (!password) return null;
    if (password.length < 6) return "weak";
    if (password.length < 10) return "medium";
    return "strong";
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const handleChange = (event) => {
    setError("");
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      setError("Please enter your full name");
      return;
    }

    if (!formData.email.trim()) {
      setError("Please enter your email address");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    window.setTimeout(() => {
      saveUser(formData);
      setLoading(false);
      navigate("/login", {
        replace: true,
        state: { message: "Account created successfully! Please sign in." },
      });
    }, 550);
  };

  return (
    <AuthShell
      icon="bi-person-plus"
      title="Create account"
      subtitle="Join us and get started today"
      footer={
        <p>
          Already have an account? <AuthLink to="/login">Sign in</AuthLink>
        </p>
      }
    >
      <form onSubmit={handleSubmit}>
        <label className="field">
          <span>Full name</span>
          <div className="input-wrapper">
            <i className="bi bi-person" aria-hidden="true" />
            <input
              autoComplete="name"
              name="name"
              onChange={handleChange}
              placeholder="John Doe"
              required
              type="text"
              value={formData.name}
            />
          </div>
        </label>

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
          <div className="input-wrapper">
            <i className="bi bi-lock" aria-hidden="true" />
            <input
              autoComplete="new-password"
              name="password"
              onChange={handleChange}
              placeholder="Create a strong password"
              required
              type="password"
              value={formData.password}
            />
          </div>
          {passwordStrength && (
            <div className="password-strength">
              <div className="strength-bars">
                <div className={`strength-bar ${passwordStrength}`} />
                <div className={`strength-bar ${passwordStrength === "strong" ? "strong" : ""}`} />
                <div className={`strength-bar ${passwordStrength === "strong" ? "strong" : ""}`} />
              </div>
              <span className={`strength-text ${passwordStrength}`}>
                {passwordStrength === "weak" && "Weak"}
                {passwordStrength === "medium" && "Medium"}
                {passwordStrength === "strong" && "Strong"}
              </span>
            </div>
          )}
        </label>

        <label className="field">
          <span>Confirm password</span>
          <div className="input-wrapper">
            <i className="bi bi-check-circle" aria-hidden="true" />
            <input
              autoComplete="new-password"
              name="confirmPassword"
              onChange={handleChange}
              placeholder="Confirm your password"
              required
              type="password"
              value={formData.confirmPassword}
            />
          </div>
        </label>

        <label className="field">
          <span>Role</span>
          <div className="input-wrapper">
            <i className="bi bi-shield-check" aria-hidden="true" />
            <select name="role" onChange={handleChange} value={formData.role}>
              <option value="user">User</option>
              <option value="admin">Administrator</option>
            </select>
          </div>
        </label>

        {error && (
          <p className="form-alert">
            <i className="bi bi-exclamation-circle" /> {error}
          </p>
        )}

        <button className="btn primary full" disabled={loading} type="submit">
          {loading ? (
            <>
              <span className="spinner" style={{ display: "inline-block", width: "16px", height: "16px", border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid white", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
              Creating account...
            </>
          ) : (
            "Create account"
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

export default Register;
