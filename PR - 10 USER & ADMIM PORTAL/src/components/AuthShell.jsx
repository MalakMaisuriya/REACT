import { Link } from "react-router-dom";

function AuthShell({ icon, title, subtitle, children, footer }) {
  return (
    <main className="auth-page">
      <section className="auth-copy" aria-label="Product overview">
        <div className="brand-lockup">
          <span className="brand-mark">AP</span>
          <span>AuthPortal</span>
        </div>
        <h1>Secure access for your business</h1>
        <p>
          A modern authentication portal with role-based access control, password 
          recovery, and a clean, intuitive user interface. Built with React.
        </p>
        <div className="trust-grid">
          <span>Role-based access</span>
          <span>Secure passwords</span>
          <span>Responsive design</span>
        </div>
      </section>

      <section className="auth-card" aria-label={title}>
        <div className="auth-icon">
          <i className={`bi ${icon}`} aria-hidden="true" />
        </div>
        <h2>{title}</h2>
        <p className="subtitle">{subtitle}</p>
        {children}
        {footer && <div className="auth-footer">{footer}</div>}
      </section>
    </main>
  );
}

export function AuthLink({ to, children }) {
  return <Link to={to}>{children}</Link>;
}

export default AuthShell;
