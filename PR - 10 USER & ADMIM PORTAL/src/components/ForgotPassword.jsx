import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthShell, { AuthLink } from "./AuthShell";
import { getStoredUser, updatePassword } from "../utils/auth";

function ForgotPassword() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("email"); // email, reset, success
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    setError("");
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleEmailSubmit = (event) => {
    event.preventDefault();
    
    if (!formData.email.trim()) {
      setError("Please enter your email address");
      return;
    }

    const user = getStoredUser();
    if (!user || formData.email.trim().toLowerCase() !== user.email) {
      setError("No account found with this email address");
      return;
    }

    setStep("reset");
    setError("");
  };

  const handleResetSubmit = (event) => {
    event.preventDefault();

    if (formData.newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    window.setTimeout(() => {
      updatePassword(formData.newPassword);
      setLoading(false);
      setStep("success");
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 2000);
    }, 550);
  };

  return (
    <AuthShell
      icon={step === "success" ? "bi-check-circle" : "bi-shield-exclamation"}
      title={
        step === "email"
          ? "Reset password"
          : step === "reset"
          ? "Create new password"
          : "Password reset successful"
      }
      subtitle={
        step === "email"
          ? "Enter your email to find your account"
          : step === "reset"
          ? "Choose a strong password for your account"
          : "Your password has been successfully reset"
      }
      footer={
        <p>
          <AuthLink to="/login">Back to sign in</AuthLink>
        </p>
      }
    >
      {step === "email" && (
        <form onSubmit={handleEmailSubmit}>
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

          {error && (
            <p className="form-alert">
              <i className="bi bi-exclamation-circle" /> {error}
            </p>
          )}

          <button className="btn primary full" disabled={loading} type="submit">
            {loading ? "Verifying..." : "Continue"}
          </button>
        </form>
      )}

      {step === "reset" && (
        <form onSubmit={handleResetSubmit}>
          <label className="field">
            <span>New password</span>
            <div className="input-wrapper">
              <i className="bi bi-lock" aria-hidden="true" />
              <input
                autoComplete="new-password"
                name="newPassword"
                onChange={handleChange}
                placeholder="Create a strong password"
                required
                type="password"
                value={formData.newPassword}
              />
            </div>
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

          {error && (
            <p className="form-alert">
              <i className="bi bi-exclamation-circle" /> {error}
            </p>
          )}

          <button className="btn primary full" disabled={loading} type="submit">
            {loading ? (
              <>
                <span className="spinner" style={{ display: "inline-block", width: "16px", height: "16px", border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid white", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
                Updating...
              </>
            ) : (
              "Update password"
            )}
          </button>
        </form>
      )}

      {step === "success" && (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                background: "var(--success-light)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--success)",
                fontSize: "2rem",
              }}
            >
              <i className="bi bi-check-lg" />
            </div>
          </div>
          <p style={{ marginBottom: "10px", fontWeight: "600" }}>
            Password updated successfully!
          </p>
          <p style={{ color: "var(--text-secondary)", marginBottom: "20px" }}>
            Redirecting to login page...
          </p>
        </div>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </AuthShell>
  );
}

export default ForgotPassword;
