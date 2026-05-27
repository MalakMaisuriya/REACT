import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="not-found">
      <section className="auth-card">
        <div className="auth-icon">
          <i className="bi bi-compass" aria-hidden="true" />
        </div>
        <h1>404</h1>
        <h2>Page not found</h2>
        <p className="subtitle">
          This route does not exist, or your current role cannot access it.
        </p>
        <Link className="btn primary full" to="/login">
          <i className="bi bi-house-door" aria-hidden="true" />
          Return to sign in
        </Link>
      </section>
    </main>
  );
}

export default NotFound;
