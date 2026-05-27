import { useState } from "react";
import DashboardShell from "./DashboardShell";
import { currentSession } from "../utils/auth";

const tabs = [
  { id: "overview", label: "Overview", title: "Admin overview", icon: "bi-grid-1x2" },
  { id: "reports", label: "Reports", title: "System reports", icon: "bi-bar-chart" },
  { id: "settings", label: "Settings", title: "Security settings", icon: "bi-sliders" },
];

const activities = [
  ["Admin session approved", "2 min ago", "success"],
  ["New user account created", "38 min ago", "info"],
  ["Password reset policy checked", "1 hour ago", "warning"],
  ["Nightly backup completed", "3 hours ago", "success"],
];

function StatCard({ label, value, detail, tone = "neutral", icon }) {
  return (
    <article className={`stat-card ${tone}`}>
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
        <small>{detail}</small>
      </div>
      <i className={`bi ${icon}`} aria-hidden="true" />
    </article>
  );
}

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const session = currentSession();

  return (
    <DashboardShell
      activeTab={activeTab}
      role="admin"
      setActiveTab={setActiveTab}
      tabs={tabs}
      user={session}
    >
      {activeTab === "overview" && (
        <>
          <section className="hero-panel">
            <div>
              <p className="eyebrow">Live control room</p>
              <h2>Welcome, {session.name}. Your auth system is healthy.</h2>
              <p>
                Monitor sessions, account health, and operational signals from
                one focused admin surface.
              </p>
            </div>
            <div className="health-ring">
              <strong>99.9%</strong>
              <span>uptime</span>
            </div>
          </section>

          <section className="stats-grid">
            <StatCard icon="bi-people" label="Total users" value="1,482" detail="+42 today" tone="info" />
            <StatCard icon="bi-activity" label="Active sessions" value="284" detail="32 admin sessions" />
            <StatCard icon="bi-shield-check" label="Security score" value="96" detail="Strong posture" tone="success" />
            <StatCard icon="bi-lightning-charge" label="API requests" value="94.2K" detail="99.98% success" tone="warning" />
          </section>

          <section className="content-grid">
            <article className="panel wide">
              <div className="panel-heading">
                <h3>Resource diagnostics</h3>
                <span className="status-pill success">Stable</span>
              </div>
              {[
                ["CPU load", 38],
                ["Memory allocation", 62],
                ["Network bandwidth", 14],
              ].map(([label, value]) => (
                <div className="meter-row" key={label}>
                  <div>
                    <span>{label}</span>
                    <strong>{value}%</strong>
                  </div>
                  <meter max="100" value={value} />
                </div>
              ))}
            </article>

            <article className="panel">
              <div className="panel-heading">
                <h3>Gateway status</h3>
              </div>
              {["Database sync", "API node", "Role policy engine"].map((item) => (
                <div className="status-row" key={item}>
                  <span className="dot" />
                  <div>
                    <strong>{item}</strong>
                    <small>Online</small>
                  </div>
                </div>
              ))}
            </article>
          </section>

          <article className="panel">
            <div className="panel-heading">
              <h3>Recent activity</h3>
            </div>
            <div className="activity-list">
              {activities.map(([label, time, tone]) => (
                <div className="activity-item" key={label}>
                  <span className={`dot ${tone}`} />
                  <strong>{label}</strong>
                  <small>{time}</small>
                </div>
              ))}
            </div>
          </article>
        </>
      )}

      {activeTab === "reports" && (
        <>
          <section className="stats-grid two">
            <StatCard icon="bi-graph-up-arrow" label="Weekly growth" value="+18.4%" detail="Compared to last week" tone="success" />
            <StatCard icon="bi-person-check" label="Activation rate" value="91.2%" detail="New accounts verified" tone="info" />
          </section>
          <article className="panel">
            <div className="panel-heading">
              <h3>Weekly traffic density</h3>
              <span className="status-pill">Current week</span>
            </div>
            <div className="bar-chart">
              {[40, 65, 35, 90, 55, 80, 95].map((value, index) => (
                <div className="bar-column" key={value + index}>
                  <span>{value}%</span>
                  <div style={{ height: `${value}%` }} />
                  <small>{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}</small>
                </div>
              ))}
            </div>
          </article>
        </>
      )}

      {activeTab === "settings" && (
        <article className="panel settings-panel">
          <div className="panel-heading">
            <h3>Notification preferences</h3>
            <button className="btn primary" type="button">Save settings</button>
          </div>
          {[
            ["Critical alerts", "Send immediate updates for downtime.", true],
            ["Daily audit logs", "Generate sign-in and role change summaries.", true],
            ["Weekly growth report", "Email registration and retention insights.", false],
          ].map(([title, detail, checked]) => (
            <label className="toggle-row" key={title}>
              <span>
                <strong>{title}</strong>
                <small>{detail}</small>
              </span>
              <input defaultChecked={checked} type="checkbox" />
            </label>
          ))}
        </article>
      )}
    </DashboardShell>
  );
}

export default AdminDashboard;
