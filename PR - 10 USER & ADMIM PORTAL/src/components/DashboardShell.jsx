import { Link, useNavigate } from "react-router-dom";
import { signOut } from "../utils/auth";

function DashboardShell({ role, user, activeTab, setActiveTab, tabs, children }) {
  const navigate = useNavigate();
  const currentTab = tabs.find((tab) => tab.id === activeTab) || tabs[0];

  const handleLogout = () => {
    signOut();
    navigate("/login", { replace: true });
  };

  return (
    <div className="dashboard-shell">
      <aside className="sidebar">
        <div className="brand-lockup dashboard-brand">
          <span className="brand-mark">{role === "admin" ? "AD" : "US"}</span>
          <span>{role === "admin" ? "AdminOps" : "UserCore"}</span>
        </div>

        <nav className="sidebar-nav" aria-label={`${role} navigation`}>
          {tabs.map((tab) => (
            <button
              className={`nav-item ${activeTab === tab.id ? "active" : ""}`}
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              type="button"
            >
              <i className={`bi ${tab.icon}`} aria-hidden="true" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="mini-profile">
            <span>{user.name.charAt(0).toUpperCase()}</span>
            <div>
              <strong>{user.name}</strong>
              <small>{user.email}</small>
            </div>
          </div>
          <button className="ghost-danger" onClick={handleLogout} type="button">
            <i className="bi bi-box-arrow-right" aria-hidden="true" />
            Logout
          </button>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="topbar">
          <div>
            <p className="eyebrow">{role === "admin" ? "Administrator" : "Workspace"}</p>
            <h1>{currentTab.title}</h1>
          </div>
          <div className="topbar-actions">
            {role === "admin" && (
              <Link className="btn secondary" to="/user-dashboard">
                <i className="bi bi-window-sidebar" aria-hidden="true" />
                User view
              </Link>
            )}
            <Link className="btn secondary" to="/change-password">
              <i className="bi bi-key" aria-hidden="true" />
              Password
            </Link>
          </div>
        </header>
        <section className="dashboard-content">{children}</section>
      </main>
    </div>
  );
}

export default DashboardShell;
