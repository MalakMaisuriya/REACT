import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthShell, { AuthLink } from "./AuthShell";
import { currentSession, getStoredUser, signOut, updatePassword } from "../utils/auth";

function ChangePassword() {
  const navigate = useNavigate();
  const session = currentSession();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  });
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    setError("");
    setSuccess("");
    setPasswords((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((current) => ({
      ...current,
      [field]: !current[field],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = getStoredUser();

    if (!passwords.oldPassword) {
      setError("Please enter your current password");
      return;
    }

    if (!user || passwords.oldPassword !== user.password) {
      setError("Current password is incorrect");
      return;
    }

    if (passwords.newPassword.length < 6) {
      setError("New password must be at least 6 characters");
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (passwords.oldPassword === passwords.newPassword) {
      setError("New password must be different from current password");
      return;
    }

    setLoading(true);
    window.setTimeout(() => {
      updatePassword(passwords.newPassword);
      signOut();
      setLoading(false);
      setSuccess("Password changed successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1500);
    }, 550);
  };

  const dashboardLink = session.role === "admin" ? "/admin-dashboard" : "/user-dashboard";

  return (
    <AuthShell
      icon="bi-key"
      title="Change password"
      subtitle="Keep your account secure by updating your password"
      footer={
        <p>
          <AuthLink to={dashboardLink}>Back to dashboard</AuthLink>
        </p>
      }
    >
      <form onSubmit={handleSubmit}>
        <label className="field">
          <span>Current password</span>
          <div className="input-wrapper" style={{ position: "relative" }}>
            <i className="bi bi-lock" aria-hidden="true" />
            <input
              autoComplete="current-password"
              name="oldPassword"
              onChange={handleChange}
              placeholder="Enter your current password"
              required
              type={showPasswords.old ? "text" : "password"}
              value={passwords.oldPassword}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("old")}
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
              <i className={`bi ${showPasswords.old ? "bi-eye-slash" : "bi-eye"}`} />
            </button>
          </div>
        </label>

        <label className="field">
          <span>New password</span>
          <div className="input-wrapper" style={{ position: "relative" }}>
            <i className="bi bi-shield-lock" aria-hidden="true" />
            <input
              autoComplete="new-password"
              name="newPassword"
              onChange={handleChange}
              placeholder="Create a strong password"
              required
              type={showPasswords.new ? "text" : "password"}
              value={passwords.newPassword}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("new")}
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
              <i className={`bi ${showPasswords.new ? "bi-eye-slash" : "bi-eye"}`} />
            </button>
          </div>
        </label>

        <label className="field">
          <span>Confirm new password</span>
          <div className="input-wrapper" style={{ position: "relative" }}>
            <i className="bi bi-check-circle" aria-hidden="true" />
            <input
              autoComplete="new-password"
              name="confirmPassword"
              onChange={handleChange}
              placeholder="Confirm your new password"
              required
              type={showPasswords.confirm ? "text" : "password"}
              value={passwords.confirmPassword}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("confirm")}
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
              <i className={`bi ${showPasswords.confirm ? "bi-eye-slash" : "bi-eye"}`} />
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
              Updating...
            </>
          ) : (
            "Save new password"
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

export default ChangePassword;
